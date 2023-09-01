import { Server, Socket } from "socket.io";
import mongoose from "mongoose";
import Message from "../models/Message";
import Chat from "../models/Chat";


interface MessagePayload {
  text: string;
  senderId: string;
  chatId: string;
}

const messageHandler = (io: Server, socket: Socket) => {
  const createMessage = async (messagePayload: MessagePayload) => {
    const { chatId, text, senderId } = messagePayload;
    const message = new Message({
      text,
      sender: new mongoose.Types.ObjectId(senderId),
      timestamp: new Date(),
      chat: new mongoose.Types.ObjectId(chatId),
    });
    const newMessage = await message.save();

    // Add message to chat's messages field
    await Chat.findByIdAndUpdate(chatId, {
      $push: { messages: newMessage._id },
    });

    console.log(newMessage.toJSON())
    socket.broadcast.emit("message:create", newMessage.toJSON())
  };

  socket.on("message:create", createMessage)
}
 
export default messageHandler