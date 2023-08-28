const chatsRouter = require("express").Router();
const User = require("../models/User");
const Chat = require("../models/Chat");

// Get all user's chats
chatsRouter.get("/users/:userId/chats", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId).populate("chats");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user.chats);
  } catch (error) {
    next(error);
  }
});

// Get individual chat
chatsRouter.get("/chats/:chatId", async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.chatId)
      .populate("messages").populate({
        path: "messages",
        populate: "sender"
      })
      .populate("users");
    
    res.json(chat);
  } catch (error) {
    next(error);
  }
});

// Create chat
chatsRouter.post("/chats", async (req, res, next) => {
  try {
    const user1 = await User.findById(req.query.user1);
    const user2 = await User.findById(req.query.user2);
    if (!user1 || !user2) {
      return res.status(404).json({ error: `User not found` });
    }
  
    const chat = new Chat({
      users: [user1._id, user2._id],
    });
    const newChat = await chat.save();
  
    // Add chat to users' chats fields
    user1.chats.push(newChat._id);
    user2.chats.push(newChat._id);
    await user1.save();
    await user2.save();
  
    res.json(newChat);
  } catch (error) {
    next(error)
  }
});

module.exports = chatsRouter;
