import { Member } from './member';
import { MessageWrapped } from '../translate/message-wrapped';
import { Support } from '../kpis/support';
import { Guest } from './guest';

export interface Chat {
  lasttime: string;
  expiryDate: number;
  guests: Array<Guest>;
  active: boolean;
  support: Support;
  members: Array<Member>;
  messages?: Array<MessageWrapped>;
  monoToMultiTime?: number;
}
