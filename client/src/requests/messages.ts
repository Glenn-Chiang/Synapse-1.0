import axios from "./axios";

const createMessage = async (
  text: string,
  senderId: string,
  chatId: string
) => {
  const response = await axios.post("/messages", { text, senderId, chatId });
  return response.data;
};

export { createMessage };
