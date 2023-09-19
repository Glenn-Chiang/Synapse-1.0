import { useQuery, useQueryClient } from "react-query";
import { Chat, Message, RoomType } from "../types";
import axios from "./axios";
import socket from "../socket";
import { useEffect } from "react";

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

const useCreateMessage = () => {
  const handleMessage = useMessageHandler();
  return (messageData: {
    text: string;
    senderId: string;
    roomId: string; // Either a channelId or chatId
    roomType: "Channel" | "Chat";
  }) => {
    socket.emit("message:create", messageData, handleMessage);
  };
};

const useEditMessage = () => {
  const handleMessage = useMessageHandler();
  return (messageId: string, text: string) => {
    socket.emit("message:edit", messageId, text, handleMessage);
  };
};

const useDeleteMessage = () => {
  const handleMessage = useMessageHandler();
  return (messageId: string) => {
    socket.emit("message:delete", messageId, handleMessage);
  };
};

// All create/update/delete operations on messages are handled by simply refetching messages and chats/channels
const useMessageHandler = () => {
  const queryClient = useQueryClient();
  return async ({
    roomId,
    roomType,
  }: {
    roomId: string;
    roomType: RoomType;
  }) => {
    console.log('received message event')
    await queryClient.invalidateQueries([
      roomType.toLowerCase() + "s",
      roomId,
      "messages",
    ]);
    await queryClient.invalidateQueries(roomType.toLowerCase() + "s");
  };
};

const useMessageSubscription = () => {
  const handleMessage = useMessageHandler();
  useEffect(() => {
    socket.on("message", handleMessage); // All message events are handled by simply invalidating messages queries
    return () => {
      socket.off("message", handleMessage);
    };
  }, [handleMessage]);
};

// When user opens a room, mark unread incoming messages as read
const markMessagesAsRead = (currentUserId: string, roomId: string, roomType: RoomType) => {
  socket.emit("messages:read", currentUserId, roomId, roomType);
};

export {
  useGetChatMessages,
  useGetChannelMessages,
  useMessageSubscription,
  useCreateMessage,
  useEditMessage,
  useDeleteMessage,
  markMessagesAsRead,
};
