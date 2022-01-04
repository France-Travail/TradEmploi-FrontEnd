import { Message } from './translate/message';

export class MessageSingleton {
    private static instance: MessageSingleton;

    private _message:Message = null;
    private _alreadyPlay = false;

    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
    public static getInstance(): MessageSingleton {
        if (!MessageSingleton.instance) {
            MessageSingleton.instance = new MessageSingleton();
        }

        return MessageSingleton.instance;
    }

    public setMessage(value:Message):void
    {
        this._message = value;
    }

    public getMessage():Message
    {
        return this._message;
    }

    public setAlreadyPlay(value:boolean):void
    {
        this._alreadyPlay = value;
    }

    public getAlreadyPlay():boolean
    {
        return this._alreadyPlay;
    }


}
