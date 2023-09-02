import { Server, Socket } from "socket.io";
import Channel, { IChannel } from "../models/Channel";
import User from "../models/User";
import mongoose from "mongoose";
import { verify } from "jsonwebtoken";

const handleChannels = (io: Server, socket: Socket) => {
  // Subscribe to new channel and join its room
  socket.on("join channel", async (userId: string, channelId: string) => {
    socket.join(`channel:${channelId}`);

    const channel = await Channel.findByIdAndUpdate(channelId, {
      $push: { members: new mongoose.Types.ObjectId(userId) },
    });
    const user = await User.findByIdAndUpdate(userId, {
      $push: { channels: channel?._id },
    });

    io.to(`channel:${channelId}`).emit(
      "join channel",
      `${user?.username} has joined the channel!`
    );

    console.log(`${user?.username} has joined the channel!`);
  });
};

// Get all user's channels
const getChannels = async (userId: string) => {
  const channels = await Channel.find({
    members: { $in: new mongoose.Types.ObjectId(userId) },
  });
  return channels
}

// Join channels
const joinChannels = async (socket: Socket, channels: IChannel[]) => {
  const userId = socket.data.userId
  
  channels.forEach((channel) => {
    socket.join(`channel:${channel._id.toString()}`);
    console.log(`User ${userId} has joined channel: ${channel.name}`);
  });
};



const handleDisconnect = async (io: Server, socket: Socket) => {
  const userId = socket.data.userId;
  const channels = await getChannels(userId);

  socket.on("disconnect", async () => {
    const userSockets = await io.in(`user:${userId}`).fetchSockets(); // Get all sockets associated with user
    const isDisconnected = userSockets.length === 0; // User is only considered disconnected when they close all sockets
    if (isDisconnected) {
      channels.forEach((channel) => {
        socket
          .to(channel._id.toString())
          .emit("user disconnected", socket.data.userId);
      });
    }
  });
};

export {handleChannels, getChannels, joinChannels, handleDisconnect};
