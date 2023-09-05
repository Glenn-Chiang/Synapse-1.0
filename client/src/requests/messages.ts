import { useQuery, useQueryClient } from "react-query";
import { Chat, Message } from "../types";
import axios from "./axios";
import socket from "../socket";
import { useEffect } from "react";
import { MessageData } from "../../../server/src/socketHandlers/messages";

const useGetChannelMessages = (channelId: string) => {
  return useQuery({
    queryKey: ["channels", channelId, "messages"],
    queryFn: async () => {
      const response = await axios.get(`/channels/${channelId}/messages`);
      return response.data as Message[];
    },
  });
};

const useGetChatMessages = (chat: Chat | null | undefined) => {
  return useQuery({
    queryKey: ["chats", chat?.id, "messages"],
    queryFn: async () => {
      const response = await axios.get(`/chats/${chat?.id}/messages`);
      return response.data as Message[];
    },
    enabled: !!chat,
  });
};

const createMessage = (messageData: MessageData) => {
  socket.emit("message:create", messageData);
};

const editMessage = (messageId: string, text: string) => {
  socket.emit("message:edit", { messageId, text });
};

const deleteMessage = (messageId: string) => {
  socket.emit("message:delete", messageId);
};

const useMessageSubscription = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    // Messages are refetched regardless of whether it is a create, update or delete operation
    const handleMessage = async (
      recipientId: string,
      recipientType: "channels" | "chat"
    ) => {
      console.log("Message received");
      await queryClient.invalidateQueries([
        recipientType,
        recipientId,
        "messages",
      ]);
      await queryClient.invalidateQueries(recipientType);
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, [queryClient]);
};

export {
  useGetChatMessages,
  useGetChannelMessages,
  useMessageSubscription,
  createMessage,
  editMessage,
  deleteMessage,
};
