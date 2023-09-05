import { useQuery, useQueryClient } from "react-query";
import { Chat } from "../types";
import axios from "./axios";
import { ChatMessage } from "../../../server/src/socketHandlers/chats";
import socket from "../socket";
import { useEffect } from "react";

const getChats = async (userId: string) => {
  const response = await axios.get(`/users/${userId}/chats`);
  return response.data as Chat[];
};

const useGetChat = (userIds: [string, string]) => {
  return useQuery({
    queryKey: ["chats", userIds[0], userIds[1]],
    queryFn: async () => {
      const response = await axios.get(`/chats/${userIds[0]}+${userIds[1]}`);
      return response.data as Chat | null;
    },
  });
};

const useCreateChat = () => {
  const queryClient = useQueryClient();
  return (chatMessage: ChatMessage) => {
    socket.emit("chat:create", chatMessage, () => {
      queryClient.invalidateQueries("chats"); // Refetch chats when new chat is created
    });
  };
};

const useChatSubscription = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleChat = async () => {
      queryClient.invalidateQueries("chats"); // Refetch chats when new chat is created
    };

    socket.on("chat:create", handleChat);

    return () => {
      socket.off("chat:create", handleChat);
    };
  }, [queryClient]);
};

export { getChats, useGetChat, useCreateChat, useChatSubscription };
