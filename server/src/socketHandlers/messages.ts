import { Server, Socket } from "socket.io";
import mongoose from "mongoose";
import Message from "../models/Message";
import Channel from "../models/Channel";
import Chat from "../models/Chat";

export interface MessageData {
  text: string;
  senderId: string;
  recipientId: string; // Either a channelId or userId
  recipientType: 'channel' | 'user'
}

const handleMessages = (io: Server, socket: Socket) => {
  // Channel messages
  socket.on(
    "channel message",
    async (messagePayload: MessageData) => {
      const { recipientId: channelId, text, senderId } = messagePayload;

      if (!text) {
        // Reject empty message
        return;
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
      io.to(`channel:${channelId}`).emit(
        "message",
        newMessage.toJSON()
      );
    }
  );

  // Chat messages
  socket.on("chat message", async (messagePayload: MessageData) => {
    const { recipientId, text, senderId } = messagePayload;

    if (!text) {
      // Reject empty message
      return;
    }

    let chat = await Chat.findOne({ users: { $all: [senderId, recipientId] } });
    
    // Create chat between users if it does not already exist
    if (!chat) {
      chat = await new Chat({
        users: [senderId, recipientId],
        dateCreated: new Date(),
      }).save();

      // Join new chat
      socket.join(`chat:${chat._id.toString()}`)
      // Alert recipient of new chat
      socket.to(`user:${recipientId}`).emit("new chat")
    }

    const message = new Message({
      text,
      sender: senderId,
      chat: chat._id,
      timestamp: new Date(),
    });

    const newMessage = await message.save();

    // Add message to chat
    chat.messages.push(newMessage._id);
    await chat.save();

    console.log(newMessage.toJSON());
    io.to(`chat:${chat._id.toString()}`).emit(
      "message",
      newMessage.toJSON()
    );
  });
};

export default handleMessages;
