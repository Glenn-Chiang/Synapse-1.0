import { Chat } from "../types";
import axios from "./axios";

const getChats = async (userId: string) => {
  const response = await axios.get(`/users/${userId}/chats`);
  return response.data as Chat[];
};

const getChat = async (userIds: string[]) => {
  const response = await axios.get(`/chats?users=${userIds[0]}+${userIds[1]}`)
  return response.data as Chat
}

export { getChats, getChat };
