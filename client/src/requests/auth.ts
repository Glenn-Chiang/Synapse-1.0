import axios from "./axios";
import { UserInfo } from "../types";

const login = async (username: string, password: string) => {
  const response = await axios.post("/login", { username, password });
  return response.data as UserInfo;
};

export { login };
