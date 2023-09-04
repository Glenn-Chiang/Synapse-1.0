import { Server, Socket } from "socket.io";
import Channel, { IChannel } from "../models/Channel";
import User from "../models/User";
import mongoose from "mongoose";
import { verify } from "jsonwebtoken";

const handleChannels = (io: Server, socket: Socket) => {
  // Subscribe to new channel and join its room
  socket.on("join channel", async (userId: string, channelId: string) => {
    socket.join(`${channelId}`);

    const channel = await Channel.findByIdAndUpdate(channelId, {
      $push: { members: new mongoose.Types.ObjectId(userId) },
    });
    const user = await User.findByIdAndUpdate(userId, {
      $push: { channels: channel?._id },
    });

    io.to(`${channelId}`).emit(
      "join channel",
      `${user?.username} has joined the channel!`
    );

    console.log(`${user?.username} has joined the channel!`);
  });
};

export { handleChannels };
