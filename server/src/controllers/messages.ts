import * as express from "express";
const messagesRouter = express.Router();
import Message from "../models/Message";
import User from "../models/User";
import Channel from "../models/Channel";
import { MessagePayload } from "../types";
import mongoose from "mongoose";

export const createMessage = async (messagePayload: MessagePayload) => {
  const { channelId, text, senderId } = messagePayload;
  const message = new Message({
    text,
    sender: new mongoose.Types.ObjectId(senderId),
    timestamp: new Date(),
    channel: new mongoose.Types.ObjectId(channelId),
  });
  const newMessage = await message.save();

  // Add message to sender's messages field
  await User.findByIdAndUpdate(senderId, {
    $push: { sentMessages: newMessage._id },
  });

  // Add message to channel's messages field
  await Channel.findByIdAndUpdate(channelId, {
    $push: { messages: newMessage._id },
  });
  return newMessage;
};

messagesRouter.post("/messages", async (req, res, next) => {
  try {
    const newMessage = createMessage(req.body);
    res.json(newMessage);
  } catch (error) {
    next(error);
  }
});

// Get all messages in channel
messagesRouter.get("/channels/:channelId/messages", async (req, res, next) => {
  try {
    const messages = await Message.find({ channel: req.params.channelId }).populate(
      "sender"
    );
    res.json(messages);
  } catch (error) {
    next(error);
  }
});

export default messagesRouter;
