import { Token } from './token';

export class JwtGwSingleton {
    private static instance: JwtGwSingleton;

    private _token:Token = null;

    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
    public static getInstance(): JwtGwSingleton {
        if (!JwtGwSingleton.instance) {
            JwtGwSingleton.instance = new JwtGwSingleton();
        }

        return JwtGwSingleton.instance;
    }

    public setToken(value:Token):void
    {
        this._token = value;
    }

    public getToken():Token
    {
        return this._token;
    }

}
