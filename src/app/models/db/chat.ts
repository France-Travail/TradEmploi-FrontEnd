import { Message } from '../translate/message';

export interface Chat {
  lasttime: string;
  members: Array<string>;
  messages: Array<Message>;
}