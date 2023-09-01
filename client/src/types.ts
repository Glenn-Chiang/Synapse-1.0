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
  channelId: string;
  timestamp: string;
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

export type { User, UserInfo, Channel, Message };
