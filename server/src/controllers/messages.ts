import * as express from "express";
const messagesRouter = express.Router();
import Message from "../models/Message";

// Get all messages in channel
messagesRouter.get("/channels/:channelId/messages", async (req, res, next) => {
  try {
    const messages = await Message.find({
      channel: req.params.channelId,
    }).populate("sender");
    res.json(messages);
  } catch (error) {
    next(error);
  }
});

// Get all messages in chat by chatId
messagesRouter.get("/chats/:chatId/messages", async (req, res, next) => {
  const messages = await Message.find({
    chat: req.params.chatId,
  });
  res.json(messages);
});

// Get all messages between 2 users by their userIds
messagesRouter.get("/messages", async (req, res, next) => {
  const userIds = (req.query.userIds as string).split(' ')
  const messages = await Message.find({
    $or: [
      {
        sender: userIds[0],
        recipient: userIds[1],
      },
      {
        sender: userIds[1],
        recipient: userIds[0],
      },
    ],
  }).populate('sender');
  res.json(messages)
});

export default messagesRouter;
