import { Member } from './member';
import { MessageWrapped } from '../translate/message-wrapped';
import { Support } from '../support';

export interface Chat {
  lasttime: string;
  active: boolean;
  members: Array<Member>;
  messagesWrapped: Array<MessageWrapped>;
  support : Support;
}
