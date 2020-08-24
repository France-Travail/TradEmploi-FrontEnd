import { Message } from './message';

export interface MessageWrapped {
    message?: Message;
    notification?: string;
    isSender?:boolean;
    time: number;
}
