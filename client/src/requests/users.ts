import { User } from "../types";
import axios from "./axios";

const createUser = async (username: string, password: string) => {
  const response = await axios.post('/users', { username, password });
  return response.data
};

const getUsers = async () => {
  const response = await axios.get('/users')
  return response.data as User[]
}

export { createUser, getUsers };
