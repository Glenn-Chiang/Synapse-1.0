import { useQueryClient } from "react-query";
import { Message } from "../types";
import axios from "./axios";
import socket from "../socket";
import { useEffect } from "react";
import { MessageData } from "../../../server/src/socketHandlers/messages";

const getChannelMessages = async (channelId: string) => {
  const response = await axios.get(`/channels/${channelId}/messages`);
  return response.data as Message[];
};

// Get chat messages by the users involved in the chat, NOT by chatId
const getChatMessages = async (userIds: [string, string]) => {
  const response = await axios.get(`/messages?userIds=${userIds[0]}+${userIds[1]}`);
  return response.data;
};

const createMessage = (messageData: MessageData) => {
  socket.emit("message:create", messageData);
};

const editMessage = (messageId: string, text: string) => {
  socket.emit("message:edit", { messageId, text });
};

const deleteMessage = (messageId: string) => {
  socket.emit("message:delete", messageId);
};

const useMessageSubscription = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    // Messages are refetched regardless of whether it is a create, update or delete operation
    const handleMessage = async (
      recipientId: string,
      recipientType: 'channels' | 'users'
    ) => {
      await queryClient.invalidateQueries([
        recipientType,
        recipientId,
        "messages",
      ]);
      await queryClient.invalidateQueries(recipientType)
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, [queryClient]);
};

export {
  getChatMessages,
  getChannelMessages,
  useMessageSubscription,
  createMessage,
  editMessage,
  deleteMessage,
};
