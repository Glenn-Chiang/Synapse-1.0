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
import messagesRouter from "./controllers/messages";

import passport from "passport";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import messageHandler from "./socketHandlers/messages";
import channelHandler, { joinRooms } from "./socketHandlers/channels";

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
app.use(loginRouter, usersRouter, channelsRouter, messagesRouter);

// Sockets
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: ["http://localhost:5173"] },
});

io.use(async (socket, next) => {
  await joinRooms(socket)
  next()
})

io.on("connection", async (socket) => {
  console.log("User connected");
  messageHandler(io, socket);
  channelHandler(io, socket);
});




export default server;
