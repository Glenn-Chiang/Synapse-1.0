import { Chat } from "../types";
import axios from "./axios";

const getChats = async (userId: string) => {
  const response = await axios.get(`/users/${userId}/chats`);
  return response.data as Chat[];
};

const getChat = async (chatId: string) => {
  const response = await axios.get(`/chats/${chatId}`)
  return response.data as Chat
}

const createChat = async (chatId: string) => {
  const response = await axios.post(`/chats/${chatId}`)
  return response.data as Chat
}

export { getChats, getChat, createChat };
