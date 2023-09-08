import { Server, Socket } from "socket.io";
import Channel, { IChannel } from "../models/Channel";
import User from "../models/User";
import mongoose from "mongoose";
import { verify } from "jsonwebtoken";
import { ObjectId } from "mongodb";

const handleChannels = (io: Server, socket: Socket) => {
  // Join channel
  socket.on("join channel", async (userId: string, channelId: string) => {
    // Add user to channel only if they are not already a member of the channel
    const channel = await Channel.findByIdAndUpdate(channelId, {
      $addToSet: { members: new mongoose.Types.ObjectId(userId) },
    });
    const user = await User.findByIdAndUpdate(userId, {
      $addToSet: { channels: channel?._id },
    });

    socket.join(`${channelId}`);
    io.to(channelId).emit("join channel", userId);
    console.log(`${user?.username} has joined the channel!`);
  });
};

export { handleChannels };
