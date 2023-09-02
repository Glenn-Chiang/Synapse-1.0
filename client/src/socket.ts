import { Socket, io } from "socket.io-client";

interface ISocket extends Socket {
    auth: {token: string}
}

const URL = import.meta.env.VITE_BASE_URL
const token = localStorage.getItem('token') as string
const socket = io(URL, {autoConnect: false, auth: {token}}) as ISocket

export default socket