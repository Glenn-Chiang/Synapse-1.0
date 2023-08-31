import { useMutation, useQueryClient } from "react-query";
import { Message } from "../types";
import axios from "./axios";

const createMessage = async (
  text: string,
  senderId: string,
  chatId: string
) => {
  const response = await axios.post("/messages", { text, senderId, chatId });
  return response.data;
};

const getChatMessages = async (chatId: string) => {
  const response = await axios.get(`/chats/${chatId}/messages`);
  return response.data as Message[];
};

const useCreateMessage = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({
      text,
      senderId,
      chatId,
    }: {
      text: string;
      senderId: string;
      chatId: string;
    }) => createMessage(text, senderId, chatId),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries([
        "chats",
        variables.chatId,
        "messages",
      ]);
      await queryClient.invalidateQueries({
        queryKey: ["chats"],
        exact: true,
      });
    },
  });
  return mutation;
};

// const getGroupMessages = async (groupId: string) => {
//   const response = await axios.get(`/groups/${groupId}/messages`)
//   return response.data as Message[]
// }

export { createMessage, getChatMessages, useCreateMessage };
