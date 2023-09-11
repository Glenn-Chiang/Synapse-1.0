import * as express from "express";
import Chat from "../models/Chat";
import mongoose from "mongoose";
import passport from "../middleware/auth";
const chatsRouter = express.Router();

// Get user's chats
chatsRouter.get(
  "/users/:userId/chats",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const chats = await Chat.find({ users: { $in: req.params.userId } })
      .populate("users")
      .populate("messages");
    res.json(chats);
  }
);

// Get chat by userIds. This is useful to check whether the two users already have a chat
chatsRouter.get(
  "/chats/:userIds",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const userIds = req.params.userIds.split("+");
    const chat = await Chat.findOne({
      $or: [
        {
          users: [userIds[0], userIds[1]],
        },
        {
          users: [userIds[1], userIds[0]],
        },
      ],
    });
    console.log(chat);
    res.json(chat);
  }
);

export default chatsRouter;
