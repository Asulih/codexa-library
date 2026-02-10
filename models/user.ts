export interface User {
  id: string;
  name: string;
  email: string;
}

export const users: User[] = [
  {
    id: 'user#1',
    name: 'Bob Eagle',
    email: 'bob.eagle@mail.com',
  }
]