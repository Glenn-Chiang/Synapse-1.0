import axios from "./axios";

const getChats = async (userId: string) => {
  const response = await axios.get(`/users/${userId}/chats`);
  return response.data;
};

export { getChats };
