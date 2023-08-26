import axios from "./axios";

const createUser = async (username: string, password: string) => {
  const response = await axios.post('/users', { username, password });
  return response.data
};

export { createUser };
