import { Message } from '../translate/message';
import { User } from '../user';

export interface Chat {
  lasttime: string;
  members: Array<User>;
  lastMemberDeleted: User;
  messages: Array<Message>;
}
