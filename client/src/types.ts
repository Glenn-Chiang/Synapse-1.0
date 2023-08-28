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
  timestamp: Date;
}

interface Chat {
  id: string;
  users: User[];
  messages: Message[];
}
export type { User, UserInfo, Chat, Message };
