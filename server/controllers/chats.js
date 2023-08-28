const chatsRouter = require("express").Router();
// const User = require("../models/User");
const Chat = require("../models/Chat");

// Get all user's chats
chatsRouter.get("/users/:userId/chats", async (req, res, next) => {
  try {
    const chats = await Chat.find({ users: { $in: req.params.userId } })
      .populate("messages")
      .populate("users");
    res.json(chats);
  } catch (error) {
    next(error);
  }
});

// Get individual chat
chatsRouter.get("/chats/:chatId", async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.chatId)
      .populate("messages")
      .populate({
        path: "messages",
        populate: "sender",
      })
      .populate("users");

    res.json(chat);
  } catch (error) {
    next(error);
  }
});

module.exports = chatsRouter;
