import { Server, Socket } from "socket.io";
import mongoose from "mongoose";
import Message, { IMessage } from "../models/Message";
import Channel from "../models/Channel";
import Chat, { IChat } from "../models/Chat";

export interface MessageData {
  text: string;
  senderId: string;
  recipientId: string; // Either a channelId or userId
  recipientType: "Channel" | "User";
}

const createChat = async (
  socket: Socket,
  senderId: string,
  recipientId: string,
  firstMessage: IMessage
) => {
  const chat = await new Chat({
    users: [senderId, recipientId],
    dateCreated: new Date(),
    messages: [firstMessage],
  }).save();

  // Alert recipient
  socket.to(recipientId).emit("new chat");
};

const registerMessageHandlers = (io: Server, socket: Socket) => {
  const handleCreateMessage = async (messageData: MessageData, io: Server) => {
    const { recipientType, recipientId, text, senderId } = messageData;

    // Reject empty message
    if (!text) {
      return;
    }

    const message = new Message({
      text,
      sender: new mongoose.Types.ObjectId(senderId),
      recipientType,
      recipient: recipientId,
      timestamp: new Date(),
    });
    const newMessage = await message.save();

    // Update channel with new message
    if (recipientType === "Channel") {
      await Channel.findByIdAndUpdate(recipientId, {
        $push: { messages: newMessage._id },
      });
      // Update chat with new message
    } else if (recipientType === "User") {
      const chat = await Chat.findOneAndUpdate(
        {
          users: { $all: [senderId, recipientId] },
        },
        { $push: { messages: newMessage._id } }
      );

      // Create chat between users if it does not already exist
      if (!chat) {
        createChat(socket, senderId, recipientId, newMessage);
      }
    }

    console.log(newMessage.toJSON());
    emitMessageEvent(io, message as IMessage);
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
    console.log(message?.toJSON());
    emitMessageEvent(io, message as IMessage);
  };

  socket.on("message:create", handleCreateMessage);
  socket.on("message:edit", handleEditMessage);
  socket.on("message:delete", handleDeleteMessage);
};

export default registerMessageHandlers;

const emitMessageEvent = (io: Server, message: IMessage) => {
  io.to(message.recipient.toString()).emit(
    "message",
    message.recipient.toString(),
    message.recipientType.toString().toLowerCase() + "s" // 'channels' or 'users'
  );
};
