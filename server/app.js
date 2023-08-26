const express = require('express')
const app = express()
require("dotenv").config();
const cors = require('cors')
const morgan = require('morgan');
const mongoose = require("mongoose");
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const chatsRouter = require('./controllers/chats')
const messagesRouter = require('./controllers/messages');
const passport = require('passport');

// Db connection
const connectToDb = async () => {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");
};
connectToDb();

// Middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Auth
app.use(passport.initialize())

// Routers
app.use(loginRouter, usersRouter, chatsRouter, messagesRouter)

module.exports = app