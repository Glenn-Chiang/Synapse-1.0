const chatsRouter = require('express').Router()
const User = require('../models/User')
const Chat = require('../models/Chat')

chatsRouter.get('/users/:userId/chats', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId).populate('chats')
    if (!user) {
      return res.status(404).json({error: 'User not found'})
    }
    res.json(user.chats)
  } catch (error) {
    next(error)
  }
})

chatsRouter.get('/chats/:chatId', async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.chatId).populate('messages').populate('users')
    if (!chat) {
      return res.status(404).json({error: 'Chat not found'})
    }
    res.json(chat)
  } catch (error) {
    next(error)
  }
})

module.exports = chatsRouter