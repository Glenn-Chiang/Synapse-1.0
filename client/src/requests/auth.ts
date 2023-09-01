import axios from "./axios";
import { UserInfo } from "../types";
import socket from "../socket";

const login = async (username: string, password: string) => {
  const response = await axios.post("/login", { username, password });
  const user = response.data as UserInfo;
  localStorage.setItem("token", user.token);
  localStorage.setItem("userId", user.userId);
  socket.connect();
  return user;
};

export { login };
