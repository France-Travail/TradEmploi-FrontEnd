import { Token } from "./token";

export class JwtGcpSingleton {
    private static instance: JwtGcpSingleton;

    private _token:Token = null;

    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
    public static getInstance(): JwtGcpSingleton {
        if (!JwtGcpSingleton.instance) {
            JwtGcpSingleton.instance = new JwtGcpSingleton();
        }

        return JwtGcpSingleton.instance;
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
