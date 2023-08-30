const messagesRouter = require("express").Router();
const Message = require("../models/Message");
const User = require("../models/User");
const Chat = require("../models/Chat");
const mongoose = require("mongoose");

messagesRouter.post("/messages", async (req, res, next) => {
  const { chatId, text, senderId } = req.body;

  try {
    const message = new Message({
      text,
      sender: new mongoose.Types.ObjectId(senderId),
      timestamp: new Date(),
      chat: new mongoose.Types.ObjectId(chatId)
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

    res.json(newMessage);
  } catch (error) {
    next(error);
  }
});

// Get all messages in chat
messagesRouter.get("/chats/:chatId/messages", async (req, res, next) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId }).populate('sender');
    res.json(messages);
  } catch (error) {
    next(error);
  }
});

module.exports = messagesRouter;
