import { useMutation, useQuery, useQueryClient } from "react-query";
import { Channel } from "../types";
import axios from "./axios";
import socket from "../socket";

const getAllChannels = async () => {
  const response = await axios.get("/channels");
  return response.data as Channel[];
};

const getUserChannels = async (userId: string) => {
  const response = await axios.get(`/users/${userId}/channels`);
  return response.data as Channel[];
};

const useGetChannel = (channelId: string) => {
  return useQuery({
    queryKey: ["channels", channelId],
    queryFn: async () => {
      const response = await axios.get(`/channels/${channelId}`);
      return response.data as Channel;
    },
  });
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
      name,
      description,
      creatorId,
    }: {
      name: string;
      description: string;
      creatorId: string;
    }) => createChannel(name, description, creatorId),
    onSuccess: async () => {
      await queryClient.invalidateQueries(["user", "channels"]);
    },
  });
  return mutation;
};

const joinChannel = (userId: string, channelId: string) => {
  socket.emit("join channel", userId, channelId);
  console.log("emitted join channel");
};

export {
  getAllChannels,
  getUserChannels,
  useGetChannel,
  createChannel,
  useCreateChannel,
  joinChannel,
};
