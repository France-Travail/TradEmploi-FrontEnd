import { User } from '../user';
import { Message } from './message';

export interface Conversation {
  id: string;
  startDate: Date | any;
  endDate?: Date | any;
  advisor: User;
  guest: User;
  conversation: Message[];
}
