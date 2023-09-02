export interface MessagePayload {
  text: string;
  senderId: string;
  channelId: string;
}

export interface JwtPayload {
  id: string;
}

export interface SocketData {
  userId: string;
}
