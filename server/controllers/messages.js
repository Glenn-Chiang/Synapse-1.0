const messagesRouter = require("express").Router();
const Message = require("../models/Message");
const User = require("../models/User");
const Chat = require("../models/Chat");

messagesRouter.post("/chats/:chatId/messages", async (req, res, next) => {
  const { text } = req.body;
  const { senderId, recipientId } = req.query
  const chatId = req.params.chatId;

  try {
    const message = new Message({
      text,
      sender: senderId,
      recipient: recipientId,
      chat: chatId,
      timestamp: new Date(),
    });
    const newMessage = await message.save();

    // Add message to sender's messages field
    await User.findByIdAndUpdate(senderId, {
      $push: { messages: newMessage._id },
    });

    // Add message to recipient's messages field
    await User.findByIdAndUpdate(recipientId, {
      $push: { messages: newMessage._id },
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

module.exports = messagesRouter;
