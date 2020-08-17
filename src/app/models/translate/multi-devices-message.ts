import { Message } from './message';

export interface MultiDevicesMessage {
    message?: Message;
    notification?: string;
    isSender?:boolean;
}
