import { Group } from "../types";
import axios from "./axios";

const getGroups = async (userId: string) => {
  const response = await axios.get(`/users/${userId}/groups`);
  return response.data as Group[];
};

const getGroup = async (groupId: string) => {
  const response = await axios.get(`/groups/${groupId}`)
  return response.data as Group
}

const createGroup = async (name: string, creatorId: string, description: string) => {
  const response = await axios.post('/groups', {name, creatorId, description})
  return response.data as Group
}

export { getGroups, getGroup, createGroup };
