const chatsRouter = require("express").Router();
const { default: mongoose } = require("mongoose");
const Chat = require("../models/Chat");

// Get all user's chats
chatsRouter.get("/users/:userId/chats", async (req, res, next) => {
  try {
    const chats = await Chat.find({ members: { $in: req.params.userId } })
      .populate("messages")
      .populate("members");
    res.json(chats);
  } catch (error) {
    next(error);
  }
});

// Get individual chat by chatId
chatsRouter.get("/chats/:chatId", async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.chatId)
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

// Create new chat
chatsRouter.post("/chats", async (req, res, next) => {
  const { name, description, creatorId } = req.body;
  try {
    const chat = new Chat({
      name,
      description,
      creator: new mongoose.Types.ObjectId(creatorId),
      dateCreated: new Date(),
      members: [new mongoose.Types.ObjectId(creatorId)],
      admins: [new mongoose.Types.ObjectId(creatorId)],
    });
    const newChat = await chat.save()
    res.json(newChat)
  } catch (error) {
    next(error);
  }
});

module.exports = chatsRouter;
