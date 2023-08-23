interface User {
  id: string;
  username: string;
}

interface Message {
  id: string;
  text: string;
  sender: User;
  recipient: User;
  timeStamp: Date
}

interface Chat {
  id: string;
  users: User[];
  messages: Message[]
}
export type {User, Chat, Message}