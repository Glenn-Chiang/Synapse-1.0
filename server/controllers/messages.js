const messagesRouter = require("express").Router();
const Message = require("../models/Message");
const User = require("../models/User");
const Chat = require("../models/Chat");
const mongoose = require("mongoose");

messagesRouter.post("/messages", async (req, res, next) => {
  const { chatId, text, senderId } = req.body;
  console.log(req.body)
  try {
    const message = new Message({
      text,
      sender: new mongoose.Types.ObjectId(senderId),
      chat: chatId,
      timestamp: new Date(),
    });
    const newMessage = await message.save();

    // Add message to sender's messages field
    await User.findByIdAndUpdate(senderId, {
      $push: { sentMessages: newMessage._id },
    });

    // Add message to chat's messages field
    const updatedChat = await Chat.findByIdAndUpdate(chatId, {
      $push: { messages: newMessage._id },
    });

    // Create chat if chat does not yet exist
    // Private chats are created when a user first sends a message to another user
    if (!updatedChat) {
      const newChat = new Chat({
        _id: chatId,
        users: [chatId.slice(0, 24), chatId.slice(24, 48)],
        messages: [message._id],
        dateCreated: new Date(),
      });
      await newChat.save();
    }
    res.json(newMessage);
  } catch (error) {
    next(error);
  }
});

module.exports = messagesRouter;
