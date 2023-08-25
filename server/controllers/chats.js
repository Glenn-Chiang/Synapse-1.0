const chatsRouter = require('express').Router()

chatsRouter.get('/users/:userId/chats', async (req, res, next) => {
  res.json()
})

chatsRouter.get('/chats/:chatId', async (req, res, next) => {

})

module.exports = chatsRouter