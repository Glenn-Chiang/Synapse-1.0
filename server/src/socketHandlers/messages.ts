import { Server, Socket } from "socket.io";

interface MessagePayload {
  text: string;
  creatorId: string;
  chatId: string;
}

const messageHandler = (io: Server, socket: Socket) => {
  const createMessage = (payload: MessagePayload) => {
    
  }

  socket.on("message:create", createMessage)
}

export default messageHandler