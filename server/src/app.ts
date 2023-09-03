import express from "express";
const app = express();
import { configDotenv } from "dotenv";
configDotenv();
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

import loginRouter from "./controllers/login";
import usersRouter from "./controllers/users";
import channelsRouter from "./controllers/channels";
import chatsRouter from "./controllers/chats"

import passport from "passport";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import handleMessages from "./socketHandlers/messages";
import { handleChannels } from "./socketHandlers/channels";
import { verify } from "jsonwebtoken";
import { JwtPayload } from "./types";
import { handleConnect, handleDisconnect } from "./socketHandlers/connection";
import messagesRouter from "./controllers/messages";

// Db connection
const connectToDb = async () => {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log("Connected to MongoDB");
};
connectToDb();
mongoose.set('strictQuery', true)

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
  cors: { origin: ["http://localhost:5173"] },
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token as string; // jwt from client
  if (!token) {
    console.log("Unauthorised");
    return;
  }
  const decodedToken = verify(
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
  handleMessages(io, socket);
  handleChannels(io, socket);
  handleDisconnect(io, socket);
});

export default server;
