import { Server, Socket } from "socket.io";
import Chat from "../models/Chat";
import Message, { IMessage } from "../models/Message";
import mongoose from "mongoose";

export interface ChatMessage {
  text: string;
  senderId: string;
  recipientId: string;
}

// New chat is created together with first message
const handleChats = (io: Server, socket: Socket) => {
  socket.on(
    "chat:create",
    async ({ text, senderId, recipientId }: ChatMessage) => {
      const chat = await new Chat({
        users: [
          new mongoose.Types.ObjectId(senderId),
          new mongoose.Types.ObjectId(recipientId),
        ],
        dateCreated: new Date(),
      }).save();

      const message = await new Message({
        text,
        sender: new mongoose.Types.ObjectId(senderId),
        roomType: "Chat",
        room: chat._id,
        timestamp: new Date(),
      }).save();

      chat.messages.push(message._id);
      await chat.save();

      // Alert recipient
      socket.to(recipientId).emit("new chat");
    }
  );
};

export default handleChats