import { useMutation, useQueryClient } from "react-query";
import { createChat } from "../../requests/chats";
import { createMessage } from "../../requests/messages";

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
    },
  });
  return mutation;
};

const useCreateChat = () => {
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
    }) => createChat(text, senderId, recipientId),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries(["chats", variables.recipientId]);
    },
  });
  return mutation;
};

export { useCreateMessage, useCreateChat };
