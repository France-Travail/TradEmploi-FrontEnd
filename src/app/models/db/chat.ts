import { Member } from './member';
import { MessageWrapped } from '../translate/message-wrapped';
import { Support } from '../kpis/support';
import { ChatError } from '../kpis/chatError';

export interface Chat {
  lasttime: string;
  active: boolean;
  support: Support;
  members: Array<Member>;
  messages?: Array<MessageWrapped>;
  monoToMultiTime?: number;
}
