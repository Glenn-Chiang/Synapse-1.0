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

// Get all messages in chat
messagesRouter.get("/chats/:chatId/messages", async (req, res, next) => {
  const messages = await Message.find({
    chat: req.params.chatId,
  });
  res.json(messages);
});

export default messagesRouter;
