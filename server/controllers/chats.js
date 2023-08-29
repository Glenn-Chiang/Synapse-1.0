const chatsRouter = require("express").Router();
const { default: mongoose } = require("mongoose");
const Chat = require("../models/Chat");
const Message = require("../models/Message");
const User = require("../models/User");

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

// Get individual chat by userIds
chatsRouter.get(
  "/users/:currentUserId/chats/:otherUserId",
  async (req, res, next) => {
    try {
      const chat = await Chat.findOne({
        users: { $all: [req.params.currentUserId, req.params.otherUserId] },
      })
        .populate("users")
        .populate({
          path: "messages",
          populate: "sender",
        });
      res.json(chat);
    } catch (error) {
      next(error);
    }
  }
);

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

// Private chats are created when a user first sends a message to another user
chatsRouter.post("/chats", async (req, res, next) => {
  try {
    const { text, senderId, recipientId } = req.body;
  
    const chat = new Chat({
      users: [senderId, recipientId],
      dateCreated: new Date(),
    });
  
    const newChat = await chat.save();
  
    // Add new chat to users' chats field
    await User.findByIdAndUpdate(senderId, {
      $push: { chats: newChat._id },
    });
    await User.findByIdAndUpdate(recipientId, {
      $push: { chats: newChat._id },
    });
  
    // Create new message
    const message = new Message({
      text,
      sender: new mongoose.Types.ObjectId(senderId),
      chat: newChat._id,
      timestamp: new Date(),
    });
    const newMessage = await message.save()
  
    // Add message to chat
    newChat.messages.push(newMessage)
    await newChat.save()
  
    res.json(newChat)
  } catch (error) {
    next(error)
  }
});

module.exports = chatsRouter;
