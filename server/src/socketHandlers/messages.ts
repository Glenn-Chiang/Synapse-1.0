import { Server, Socket } from "socket.io";
import mongoose from "mongoose";
import Message, { IMessage } from "../models/Message";
import Channel from "../models/Channel";
import Chat, { IChat } from "../models/Chat";

export interface MessageData {
  text: string;
  senderId: string;
  roomId: string; // Either a channelId or chatId
  roomType: "Channel" | "Chat";
}

const registerMessageHandlers = (io: Server, socket: Socket) => {
  const handleCreateMessage = async (messageData: MessageData) => {
    const { roomType, roomId, text, senderId } = messageData;

    // Reject empty message
    if (!text) {
      return;
    }

    const message = new Message({
      text,
      sender: new mongoose.Types.ObjectId(senderId),
      roomType,
      room: new mongoose.Types.ObjectId(roomId),
      timestamp: new Date(),
    });
    const newMessage = await message.save();
    console.log(newMessage.toJSON());
    emitMessageEvent(io, message as IMessage);

    // Update channel with new message
    if (roomType === "Channel") {
      await Channel.findByIdAndUpdate(roomId, {
        $push: { messages: newMessage._id },
      });
      // Update chat with new message
    } else if (roomType === "Chat") {
      await Chat.findByIdAndUpdate(roomId, {
        $push: { messages: newMessage._id },
      });
    }

  };

  const handleEditMessage = async (messageId: string, text: string) => {
    const message = await Message.findByIdAndUpdate(
      messageId,
      { $set: { text: text } },
      { new: true }
    );
    console.log(message?.toJSON());
    emitMessageEvent(io, message as IMessage);
  };

  const handleDeleteMessage = async (messageId: string) => {
    const message = await Message.findByIdAndDelete(messageId);
    if (message?.roomType.toString() === "Channel") {
      await Channel.findByIdAndUpdate(message.room, {
        $pull: { messages: { messageId } },
      });
    } else if (message?.roomType.toString() === "Channel") {
      await Chat.findByIdAndUpdate(message.room, {
        $pull: { messages: { messageId } },
      });
    }
    console.log(message?.toJSON());
    emitMessageEvent(io, message as IMessage);
  };

  socket.on("message:create", handleCreateMessage);
  socket.on("message:edit", handleEditMessage);
  socket.on("message:delete", handleDeleteMessage);
};

export default registerMessageHandlers;

const emitMessageEvent = (io: Server, message: IMessage) => {
  io.to(message.room.toString()).emit(
    "message",
    message.room.toString(),
    message.roomType.toString().toLowerCase() + "s" // 'channels' or 'chats'
  );
};
