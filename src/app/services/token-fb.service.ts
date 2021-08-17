import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { JwtFbSingleton } from '../models/token/JwtFbSingleton';
import { FbAuthSingleton } from '../models/token/FbAuthSingleton';

@Injectable({
  providedIn: 'root',
})
export class TokenFbService {
  
  public async jwtFbOnSingleton() {
    const jwtFbSingleton = JwtFbSingleton.getInstance();
    const hasJwtFbOnTime = jwtFbSingleton.getToken() !== null && jwtFbSingleton.getToken().expireTime.isAfter(moment());
    if (!hasJwtFbOnTime) {
      const auth = FbAuthSingleton.getInstance().getFbAuth();
      const token = await auth.user.getIdTokenResult();
      jwtFbSingleton.setToken({ token: token.token, expireTime: moment(token.expirationTime) });
    }
  }
}
