import { useMutation, useQueryClient } from "react-query";
import { Message } from "../types";
import axios from "./axios";
import socket from "../socket";
import { MessagePayload } from "../../../server/src/types";

const getChannelMessages = async (channelId: string) => {
  const response = await axios.get(`/channels/${channelId}/messages`);
  return response.data as Message[];
};


const useCreateMessage = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: MessagePayload) => socket.emit("message:create", payload),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries([
        "channels",
        variables.channelId,
        "messages",
      ]);
      const currentUserId = localStorage.getItem("userId");
      await queryClient.invalidateQueries([currentUserId, "channels"]);
    },
  });
  return mutation;
};

const useMessageSubscription = () => {
  const queryClient = useQueryClient();
  const currentUserId = localStorage.getItem('userId')
  
  socket.on("message:create", (message: Message) => {
    queryClient.invalidateQueries([
      "channels",
      message.channel,
      "messages",
    ]);
    queryClient.invalidateQueries([currentUserId, 'channels'])
  });
  
}

export { getChannelMessages, useCreateMessage, useMessageSubscription };
