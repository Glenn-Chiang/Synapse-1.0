import { io } from "socket.io-client";

const URL = import.meta.env.VITE_BASE_URL
const token = localStorage.getItem('token') as string
const socket = io(URL, {autoConnect: false, auth: {token}})

export default socket