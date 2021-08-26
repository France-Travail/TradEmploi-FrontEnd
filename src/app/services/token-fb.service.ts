import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { JwtFbSingleton } from '../models/token/JwtFbSingleton';
import { FbAuthSingleton } from '../models/token/FbAuthSingleton';

@Injectable({
  providedIn: 'root',
})
export class TokenFbService {
  public async getTokenFb(): Promise<string> {
    const jwtFbSingleton = JwtFbSingleton.getInstance();
    const hasJwtFbOnTime = jwtFbSingleton.getToken() !== null && jwtFbSingleton.getToken().expireTime.isAfter(moment());
    return hasJwtFbOnTime ? jwtFbSingleton.getToken().token : this.refreshToken(jwtFbSingleton);
  }
  private async refreshToken(jwtFbSingleton: JwtFbSingleton) {
    const auth = FbAuthSingleton.getInstance().getFbAuth();
    const token = await auth.user.getIdTokenResult(true);
    jwtFbSingleton.setToken({ token: token.token, expireTime: moment(token.expirationTime) });
    return token.token;
  }
}
