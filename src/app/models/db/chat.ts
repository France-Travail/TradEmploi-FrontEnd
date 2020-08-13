import { Message } from '../translate/message';
import { Member } from './member';

export interface Chat {
  lasttime: string;
  members: Array<Member>;
  messages: Array<Message>;
}
