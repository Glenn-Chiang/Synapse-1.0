import { useQueryClient } from "react-query";
import { Message } from "../types";
import axios from "./axios";
import socket from "../socket";
import { useEffect } from "react";

const getChannelMessages = async (channelId: string) => {
  const response = await axios.get(`/channels/${channelId}/messages`);
  return response.data as Message[];
};

// Get chat messages by the users involved in the chat, NOT by chatId
const getChatMessages = async (chatId: string) => {
  const response = await axios.get(`/chats${chatId}/messages`);
  return response.data;
};

const createMessage = (payload: {
  text: string;
  senderId: string;
  recipientId: string;
}) => {
  socket.emit("message:create", payload);
};

const useMessageSubscription = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const onChannelMessage = async (message: Message) => {
      console.log("message received");
      await queryClient.invalidateQueries([
        "channels",
        message.channel,
        "messages",
      ]);
      await queryClient.invalidateQueries(["user", "channels"]);
    };
    socket.on("channel message", onChannelMessage);

    const onChatMessage = async (message: Message) => {
      console.log("message received");
      await queryClient.invalidateQueries(["chats", message.chat, "messages"]);
      await queryClient.invalidateQueries(["user", "chats"]);
    };
    socket.on("chat message", onChatMessage);

    return () => {
      socket.off("channel message", onChannelMessage);
      socket.off("chat message", onChatMessage);
    };
  }, [queryClient]);
};

export { getChatMessages, getChannelMessages, useMessageSubscription, createMessage };
