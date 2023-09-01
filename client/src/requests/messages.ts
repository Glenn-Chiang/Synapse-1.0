import { useMutation, useQueryClient } from "react-query";
import { Message } from "../types";
import axios from "./axios";

const createMessage = async (
  text: string,
  senderId: string,
  channelId: string
) => {
  const response = await axios.post("/messages", { text, senderId, channelId });
  return response.data;
};

const getChannelMessages = async (channelId: string) => {
  const response = await axios.get(`/channels/${channelId}/messages`);
  return response.data as Message[];
};

const useCreateMessage = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({
      text,
      senderId,
      channelId,
    }: {
      text: string;
      senderId: string;
      channelId: string;
    }) => createMessage(text, senderId, channelId),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries([
        "channels",
        variables.channelId,
        "messages",
      ]);
      await queryClient.invalidateQueries({
        queryKey: ["channels"],
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

export { createMessage, getChannelMessages, useCreateMessage };
