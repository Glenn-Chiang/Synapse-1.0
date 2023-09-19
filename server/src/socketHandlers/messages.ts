import { Socket } from "socket.io";
import mongoose from "mongoose";
import Message, { IMessage } from "../models/Message.js";
import Channel from "../models/Channel.js";
import Chat from "../models/Chat.js";
import { RoomType } from "../types.js";

export interface MessageData {
  text: string;
  senderId: string;
  roomId: string; // Either a channelId or chatId
  roomType: "Channel" | "Chat";
}

export type MessageCallback = ({
  roomId,
  roomType,
}: {
  roomId: string;
  roomType: "Channel" | "Chat";
}) => void;

const registerMessageHandlers = (socket: Socket) => {
  const handleCreateMessage = async (
    messageData: MessageData,
    messageCallback: MessageCallback
  ) => {
    const { roomType, roomId, text, senderId } = messageData;

    // Reject empty message
    if (!text) {
      return;
    }

    const message = await new Message({
      text,
      sender: new mongoose.Types.ObjectId(senderId),
      roomType,
      room: new mongoose.Types.ObjectId(roomId),
      timestamp: new Date(),
      isRead: false,
    }).save();
    console.log(message.toJSON());
    emitMessageEvent(socket, message.room.toString(), message.roomType);

    // Update channel with new message
    if (roomType === "Channel") {
      await Channel.findByIdAndUpdate(roomId, {
        $push: { messages: message._id },
      });
      // Update chat with new message
    } else if (roomType === "Chat") {
      await Chat.findByIdAndUpdate(roomId, {
        $push: { messages: message._id },
      });
    }

    messageCallback({
      roomId: message.room.toString(),
      roomType: message.toJSON().roomType,
    });
  };

  const handleEditMessage = async (
    messageId: string,
    text: string,
    messageCallback: MessageCallback
  ) => {
    const message = await Message.findByIdAndUpdate(
      messageId,
      { $set: { text: text } },
      { new: true }
    );

    if (message) {
      messageCallback({
        roomId: message.room.toString(),
        roomType: message.roomType,
      });
      console.log(message.toJSON());
      emitMessageEvent(socket, message.room.toString(), message.roomType);
    }
  };

  const handleDeleteMessage = async (
    messageId: string,
    messageCallback: MessageCallback
  ) => {
    const message = await Message.findByIdAndDelete(messageId);

    if (message) {
      if (message.roomType.toString() === "Channel") {
        await Channel.findByIdAndUpdate(message.room, {
          $pull: { messages: { messageId } },
        });
      } else if (message.roomType.toString() === "Channel") {
        await Chat.findByIdAndUpdate(message.room, {
          $pull: { messages: { messageId } },
        });
      }
      messageCallback({
        roomId: message.room.toString(),
        roomType: message.roomType,
      });
      console.log(message.toJSON());
      emitMessageEvent(socket, message.room.toString(), message.roomType);
    }
  };

  const handleReadMessages = async (
    currentUserId: string,
    roomId: string,
    roomType: RoomType
  ) => {
    console.log("Received messages:read event");
    const messages = await Message.updateMany(
      {
        room: roomId,
        isRead: false,
        sender: { $ne: currentUserId },
      },
      {
        $set: { isRead: true },
      }
    );
    emitMessageEvent(socket, roomId, roomType);
  };

  socket.on("message:create", handleCreateMessage);
  socket.on("message:edit", handleEditMessage);
  socket.on("message:delete", handleDeleteMessage);
  socket.on("messages:read", handleReadMessages);
};

export default registerMessageHandlers;

const emitMessageEvent = (socket: Socket, roomId: string, roomType: RoomType) => {
  socket.to(roomId).emit("message", {
    roomId,
    roomType, 
  });
};
