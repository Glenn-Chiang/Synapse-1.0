import * as express from "express";
const messagesRouter = express.Router();
import Message from "../models/Message";
import User from "../models/User";
import Chat from "../models/Chat";
import { MessagePayload } from "../types";
import mongoose from "mongoose";

export const createMessage = async (messagePayload: MessagePayload) => {
  const { chatId, text, senderId } = messagePayload;
  const message = new Message({
    text,
    sender: new mongoose.Types.ObjectId(senderId),
    timestamp: new Date(),
    chat: new mongoose.Types.ObjectId(chatId),
  });
  const newMessage = await message.save();

  // Add message to sender's messages field
  await User.findByIdAndUpdate(senderId, {
    $push: { sentMessages: newMessage._id },
  });

  // Add message to chat's messages field
  await Chat.findByIdAndUpdate(chatId, {
    $push: { messages: newMessage._id },
  });
  return newMessage
};

messagesRouter.post("/messages", async (req, res, next) => {
  try {
    const newMessage = createMessage(req.body)
    res.json(newMessage);
  } catch (error) {
    next(error);
  }
});

// Get all messages in chat
messagesRouter.get("/chats/:chatId/messages", async (req, res, next) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId }).populate(
      "sender"
    );
    res.json(messages);
  } catch (error) {
    next(error);
  }
});

export default messagesRouter;
