import { useMutation, useQueryClient } from "react-query";
import { Chat } from "../types";
import axios from "./axios";

const getChats = async (userId: string) => {
  const response = await axios.get(`/users/${userId}/chats`);
  return response.data as Chat[];
};

const getChat = async (chatId: string) => {
  const response = await axios.get(`/chats/${chatId}`);
  return response.data as Chat;
};

const createChat = async (name: string, description: string, creatorId: string) => {
  const response = await axios.post('/chats', {name, description, creatorId})
  return response.data as Chat
}

const useCreateChat = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({
      text,
      senderId,
      recipientId,
    }: {
      text: string;
      senderId: string;
      recipientId: string;
    }) => createChat(text, senderId, recipientId),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries(["chats", variables.recipientId]);
    },
  });
  return mutation;
};


export { getChats, getChat, createChat, useCreateChat };
