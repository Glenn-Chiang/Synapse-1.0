import { Server, Socket } from "socket.io";
import Channel from "../models/Channel";
import User from "../models/User";
import mongoose from "mongoose";

const channelHandler = (io: Server, socket: Socket) => {
  socket.on("join channel", async (userId: string, channelId: string) => {
    console.log('HELLO WORLD')

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

export default channelHandler;
