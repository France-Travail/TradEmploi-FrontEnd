import { Token } from './token';

export class JwtFbSingleton {
  private static instance: JwtFbSingleton;

  private _token: Token = null;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): JwtFbSingleton {
    if (!JwtFbSingleton.instance) {
      JwtFbSingleton.instance = new JwtFbSingleton();
    }
    return JwtFbSingleton.instance;
  }

  public setToken(value: Token): void {
    this._token = value;
  }

  public getToken(): Token {
    return this._token;
  }
}
