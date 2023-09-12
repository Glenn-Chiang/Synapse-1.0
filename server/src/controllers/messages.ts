import * as express from "express";
const messagesRouter = express.Router();
import Message from "../models/Message.js";
import passport from "../middleware/auth.js"

// Get all messages in channel
messagesRouter.get(
  "/channels/:channelId/messages",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const messages = await Message.find({
        room: req.params.channelId,
      }).populate("sender");
      res.json(messages);
    } catch (error) {
      next(error);
    }
  }
);

// Get all messages in chat by chatId
messagesRouter.get(
  "/chats/:chatId/messages",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const messages = await Message.find({
      room: req.params.chatId,
      roomType: "Chat",
    }).populate("sender");
    res.json(messages);
  }
);

export default messagesRouter;
