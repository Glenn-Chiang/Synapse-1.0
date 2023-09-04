import { Server, Socket } from "socket.io";
import Channel from "../models/Channel";
import mongoose from "mongoose";
import Chat from "../models/Chat";

// Join channels
const joinChannels = async (socket: Socket) => {
  const userId = socket.data.userId;

  const channels = await Channel.find({
    members: { $in: userId },
  });

  channels.forEach((channel) => {
    socket.join(`${channel._id.toString()}`);
    console.log(`User ${userId} has joined channel: ${channel.name}`);
  });
};

// Join all user's chats
const joinChats = async (socket: Socket) => {
  const userId = socket.data.userId;

  const chats = await Chat.find({
    users: { $in: userId },
  });

  chats.forEach((chat) => {
    socket.join(`${chat._id.toString()}`);
    console.log(`User ${userId} has joined chat: ${chat._id.toString()}`);
  });
};

const handleConnect = async (io: Server, socket: Socket) => {
  const userId = socket.data.userId;
  socket.join(userId);
  joinChannels(socket);
  joinChats(socket);
};

const handleDisconnect = async (io: Server, socket: Socket) => {
  const userId = socket.data.userId;

  socket.on("disconnect", async () => {
    const userSockets = await io.in(userId).fetchSockets(); // Get all sockets that user is using
    const isDisconnected = userSockets.length === 0; // User is only considered disconnected when they close all sockets
    if (isDisconnected) {
      console.log(`User ${userId} disconnected`);
    }
  });
};

export { handleConnect, handleDisconnect };
