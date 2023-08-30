import { useMutation, useQueryClient } from "react-query";
import { Chat } from "../types";
import axios from "./axios";

const getChats = async (userId: string) => {
  const response = await axios.get(`/users/${userId}/chats`);
  return response.data as Chat[];
};

const getChat = async (currentUserId: string, otherUserId: string) => {
  const response = await axios.get(`/users/${currentUserId}/chats/${otherUserId}`);
  return response.data as Chat | null;
};

const createChat = async (text: string, senderId: string, recipientId: string) => {
  const response = await axios.post('chats', {text, senderId, recipientId})
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
