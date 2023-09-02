import { useQueryClient } from "react-query";
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
  return async (payload: MessagePayload) => {
    socket.emit("message:create", payload);
  
    await queryClient.invalidateQueries([
      "channels",
      payload.channelId,
      "messages",
    ]);
    await queryClient.invalidateQueries(['user', "channels"]);
  }

};

const useMessageSubscription = () => {
  const queryClient = useQueryClient();
  const currentUserId = localStorage.getItem("userId");
  
  socket.on("message:create", async (message: Message) => {
    console.log('message received')
    await queryClient.invalidateQueries([
      "channels",
      message.channel,
      "messages",
    ]);
    await queryClient.invalidateQueries([currentUserId, "channels"]);
  });
};

export { getChannelMessages, useCreateMessage, useMessageSubscription };
