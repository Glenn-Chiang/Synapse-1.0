import { useQuery } from "react-query";
import { Chat } from "../types";
import axios from "./axios";

const getChats = async (userId: string) => {
  const response = await axios.get(`/users/${userId}/chats`);
  return response.data as Chat[];
};

const useGetChat = (userIds: [string, string]) => {
  return useQuery({
    queryKey: ['chats', userIds[0], userIds[1]],
    queryFn: async () => {
      const response = await axios.get(`/chats/${userIds[0]}+${userIds[1]}`)
      return response.data as Chat | null
    }
  })

}

export { getChats, useGetChat };
