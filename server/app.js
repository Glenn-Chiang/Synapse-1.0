const express = require('express')
const cors = require('cors')
const usersRouter = require('./controllers/users')
const chatsRouter = require('./controllers/chats')
const messagesRouter = require('./controllers/messages')

const app = express()
app.use(cors())
app.use(express.json())

app.use(usersRouter, chatsRouter, messagesRouter)

module.exports = app