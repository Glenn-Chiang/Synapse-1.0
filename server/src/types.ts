import { Socket } from "socket.io";

export interface JwtPayload {
  id: string;
}

export interface MySocket extends Socket {
  data: {
    userId: string;
  };
}

export type RoomType = 'Channel' | 'Chat'
