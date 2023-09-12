import express from "express";
const app = express();
import { configDotenv } from "dotenv";
configDotenv();
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import passport from "passport";
import { createServer } from "http";
import { Server } from "socket.io";

import loginRouter from "./controllers/login.js";
import usersRouter from "./controllers/users.js";
import channelsRouter from "./controllers/channels.js";
import chatsRouter from "./controllers/chats.js";

import registerMessageHandlers from "./socketHandlers/messages.js";
import { handleChannels } from "./socketHandlers/channels.js";
import {
  handleConnect,
  handleDisconnect,
} from "./socketHandlers/connection.js";
import messagesRouter from "./controllers/messages.js";
import handleChats from "./socketHandlers/chats.js";
import { registerTypingHandler } from "./socketHandlers/userTyping.js";
import { JwtPayload } from "./types.js";

// Db connection
const connectToDb = async () => {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log("Connected to MongoDB");
};
connectToDb();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Auth
app.use(passport.initialize());

// Routers
app.use(loginRouter, usersRouter, channelsRouter, chatsRouter, messagesRouter);

// Sockets
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://synapse-tan.vercel.app/"],
  },
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token as string; // jwt from client
  if (!token) {
    console.log("Unauthorised");
    return;
  }
  const decodedToken = jwt.verify(
    token,
    process.env.SECRET as string
  ) as JwtPayload;
  const userId = decodedToken.id;
  socket.data.userId = userId;
  next();
});

io.on("connection", async (socket) => {
  const userId = socket.data.userId as string;
  console.log(`User ${userId} connected`);
  handleConnect(io, socket);
  registerMessageHandlers(socket);
  registerTypingHandler(socket);
  handleChannels(io, socket);
  handleChats(socket);
  handleDisconnect(io, socket);
});

export default server;
