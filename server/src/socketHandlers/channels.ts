import { Server, Socket } from "socket.io";
import Channel from "../models/Channel";
import User from "../models/User";
import mongoose from "mongoose";
import { verify } from "jsonwebtoken";

const channelHandler = (io: Server, socket: Socket) => {
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

// Join rooms of all channels of which the user is a member
export const joinRooms = async (socket: Socket) => {
  const token = socket.handshake.auth.token as string; // jwt from client
  if (!token) {
    return;
  }
  const decodedToken = verify(token, process.env.SECRET as string) as any;
  const userId = decodedToken.id as string;
  const channels = await Channel.find({
    members: { $in: new mongoose.Types.ObjectId(userId) },
  });
  channels.forEach((channel) => {
    socket.join(`channel:${channel._id.toString()}`);
    console.log(`User ${userId} has joined channel: ${channel.name}`);
  });
};

export default channelHandler;
