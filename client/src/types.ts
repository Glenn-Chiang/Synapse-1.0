interface User {
  id: string;
  username: string;
  dateJoined: Date;
  sentMessages: Message[];
  chats: Chat[];
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
  chatId: string;
  timestamp: string;
}

interface Chat {
  id: string;
  users: User[];
  messages: Message[];
}

interface Group {
  id: string;
  name: string;
  description: string;
  members: User[];
  admins: User[];
  creator: User;
  dateCreated: string;
  messages: Message[];
}

export type { User, UserInfo, Chat, Group, Message };
