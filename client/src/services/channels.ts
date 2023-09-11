import { useMutation, useQuery, useQueryClient } from "react-query";
import { Channel } from "../types";
import axios from "./axios";
import socket from "../socket";
import { useEffect } from "react";

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

// Event listener for members connecting to channel
// When member connects to channel, refetch 'number online'
const useConnectionSubscription = (channelId: string) => {
  // const queryClient = useQueryClient()
  useEffect(() => {
    socket.on('member connected', (userId: string) => {
      // queryClient.invalidateQueries(['channels', channelId, 'number online'])
      console.log(`User ${userId} has connected to channel`)
    })
  }, [channelId])
}

export {
  getAllChannels,
  getUserChannels,
  useGetChannel,
  createChannel,
  useCreateChannel,
  joinChannel,
  useConnectionSubscription
};
