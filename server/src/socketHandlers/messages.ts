import { Server, Socket } from "socket.io";
import mongoose from "mongoose";
import Message from "../models/Message";
import Channel from "../models/Channel";

interface MessagePayload {
  text: string;
  senderId: string;
  channelId: string;
}

const handleMessages = (io: Server, socket: Socket) => {
  const createMessage = async (messagePayload: MessagePayload) => {
    const { channelId, text, senderId } = messagePayload;

    if (!text) { // Reject empty message
      return 
    }

    const message = new Message({
      text,
      sender: new mongoose.Types.ObjectId(senderId),
      timestamp: new Date(),
      channel: new mongoose.Types.ObjectId(channelId),
    });
    const newMessage = await message.save();

    // Add message to channel's messages field
    await Channel.findByIdAndUpdate(channelId, {
      $push: { messages: newMessage._id },
    });

    console.log(newMessage.toJSON());
    socket.to(`channel:${channelId}`).emit("message:create", newMessage.toJSON());
    // socket.broadcast.emit("message:create", newMessage.toJSON());
  };

  socket.on("message:create", createMessage);
};

export default handleMessages;
