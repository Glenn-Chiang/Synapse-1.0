import { useMutation, useQueryClient } from "react-query";
import { Channel } from "../types";
import axios from "./axios";

const getChannels = async (userId: string) => {
  const response = await axios.get(`/users/${userId}/channels`);
  return response.data as Channel[];
};

const getChannel = async (channelId: string) => {
  const response = await axios.get(`/channels/${channelId}`);
  return response.data as Channel;
};

const createChannel = async (
  name: string,
  description: string,
  creatorId: string
) => {
  const response = await axios.post("/channels", {
    name,
    description,
    creatorId,
  });
  return response.data as Channel;
};

const useCreateChannel = () => {
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
    }) => createChannel(text, senderId, recipientId),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries(["channels", variables.recipientId]);
    },
  });
  return mutation;
};

export { getChannels, getChannel, createChannel, useCreateChannel };
