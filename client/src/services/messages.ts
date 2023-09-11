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

const useCreateMessage = () => {
  const handleMessage = useMessageHandler();
  return (messageData: MessageData) => {
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
    roomType: "Chat" | "Channel";
  }) => {
    await queryClient.invalidateQueries([
      roomType.toLowerCase() + "s",
      roomId,
      "messages",
    ]);
    await queryClient.invalidateQueries(roomType.toLowerCase() + 's');
  };
};

const useMessageSubscription = () => {
  const handleMessage = useMessageHandler();
  useEffect(() => {
    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, [handleMessage]);
};

const useTypingSubscription = () => {
  const handleUserTyping = (username: string) => {
    console.log(username, 'is typing')
  }
  useEffect(() => {
    socket.on('user typing', handleUserTyping)

    return  () => {
      socket.off('user typing', handleUserTyping)
    }
  }, [])
}

export {
  useGetChatMessages,
  useGetChannelMessages,
  useMessageSubscription,
  useCreateMessage,
  useEditMessage,
  useDeleteMessage,
  useTypingSubscription
};
