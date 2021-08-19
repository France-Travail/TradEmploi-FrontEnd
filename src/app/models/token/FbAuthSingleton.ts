
export class FbAuthSingleton {
  private static instance: FbAuthSingleton;

  private _auth: firebase.auth.UserCredential = null;

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
  public static getInstance(): FbAuthSingleton {
    if (!FbAuthSingleton.instance) {
      FbAuthSingleton.instance = new FbAuthSingleton();
    }
    return FbAuthSingleton.instance;
  }

  public setFbAuth(value: firebase.auth.UserCredential): void {
    this._auth = value;
  }

  public getFbAuth(): firebase.auth.UserCredential {
    return this._auth;
  }
}
