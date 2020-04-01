import { User } from 'firebase';

export interface Auth {
  user: User;
  role?: 'USER' | 'ADMIN';
}