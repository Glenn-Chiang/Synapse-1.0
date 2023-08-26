import axios from "axios";

const BASE_URL: string = import.meta.env.VITE_BASE_URL;

const createUser = async (username: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/users`, { username, password });
  return response.data
};

export { createUser };
