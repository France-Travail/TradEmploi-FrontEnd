import { Message } from './translate/message';

export interface ChatInput {
    message: Message;
    notification?: string;
}
