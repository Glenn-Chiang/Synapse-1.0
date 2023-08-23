interface User {
  id: string;
  username: string;
}

interface Chat {
  id: string;
  users: User[];
}
export type {User, Chat}