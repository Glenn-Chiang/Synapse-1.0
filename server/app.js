const express = require('express')
require("dotenv").config();
const cors = require('cors')
const morgan = require('morgan');
const mongoose = require("mongoose");
const usersRouter = require('./controllers/users')
const chatsRouter = require('./controllers/chats')
const messagesRouter = require('./controllers/messages')

const connectToDb = async () => {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");
};

connectToDb();

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use(usersRouter, chatsRouter, messagesRouter)

module.exports = app