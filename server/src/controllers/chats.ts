import * as express from "express";
import Chat from "../models/Chat";
const chatsRouter = express.Router();

// Get user's chats
chatsRouter.get('/users/:userId/chats', async (req, res, next) => {
  const chats = await Chat.find({users: {$in: req.params.userId}})
  res.json(chats)
})

// Get chat by userIds. This is useful to check whether the two users already have a chat
chatsRouter.get("/chats/:userIds", async (req, res, next) => {
  const userIds = req.params.userIds.split("+");
  const chat = await Chat.findOne({ users: { $all: userIds } });
  res.json(chat);
});



export default chatsRouter
