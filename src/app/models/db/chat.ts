import { Message } from '../translate/message';
import { Member } from './member';

export interface Chat {
  lasttime: string;
  active: boolean;
  members: Array<Member>;
  messages: Array<Message>;
}
