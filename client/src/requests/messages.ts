import axios from "./axios";

const createMessage = async (
  text: string,
  senderId: string,
  chatId: string
) => {
  const response = await axios.post("/messages", { text, senderId, chatId });
  return response.data;
};

const getChatMessages = async (chatId: string) => {
  const response = await axios.get(`/chats/${chatId}/messages`);
  return response.data
}

export { createMessage, getChatMessages };
