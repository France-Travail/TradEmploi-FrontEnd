import { Message } from './message';

export interface MessageWrapped {
    message?: Message;
    notification?: string;
    information?: HTMLAudioElement;
    isSender?: boolean;
    time: number;
}
