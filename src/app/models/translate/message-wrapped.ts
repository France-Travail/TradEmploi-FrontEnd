import { Notification } from './notification';
import { Message } from './message';

export interface MessageWrapped {
    message?: Message;
    notification?: Notification;
    isSender?: boolean;
    time: number;
}
