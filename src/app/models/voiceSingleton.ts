import { Voice } from "./voice";

export class VoiceSingleton {
    private static instance: VoiceSingleton;

    private _voices:Array<Voice> = [];

    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    private constructor() { }

    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
    public static getInstance(): VoiceSingleton {
        if (!VoiceSingleton.instance) {
            VoiceSingleton.instance = new VoiceSingleton();
        }

        return VoiceSingleton.instance;
    }

    public setVoice(value:Array<Voice>):void
    {
        this._voices = value;
    }

    public getVoice():Array<Voice>
    {
        return this._voices;
    }

}
