interface User {
  id: string;
  username: string;
  dateJoined: Date;
  sentMessages: Message[];
  channels: Channel[];
}

// Non-senstive user info stored in local storage
interface UserInfo {
  token: string;
  userId: string;
  username: string;
}

interface Message {
  id: string;
  text: string;
  sender: User;
  roomType: "Channel" | "Chat";
  room: Channel | Chat;
  timestamp: string;
  isRead: boolean;
}

interface Channel {
  id: string;
  name: string;
  description: string;
  members: User[];
  admins: User[];
  creator: User;
  dateCreated: string;
  messages: Message[];
}

interface Chat {
  id: string;
  users: User[];
  messages: Message[];
}

type RoomType = 'Channel' | 'Chat'

export type { User, UserInfo, Channel, Chat, Message, RoomType };
