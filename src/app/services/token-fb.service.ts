import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { JwtFbSingleton } from '../models/token/JwtFbSingleton';
import { FbAuthSingleton } from '../models/token/FbAuthSingleton';
import { environment } from '../../environments/environment';
import { SettingsService } from './settings.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenFbService {
  constructor(private settingService: SettingsService, private authService: AuthService) {}
  public async getTokenFb(): Promise<string> {
    const jwtFbSingleton = JwtFbSingleton.getInstance();
    const hasJwtFbOnTime = jwtFbSingleton.getToken() !== null && jwtFbSingleton.getToken().expireTime.isAfter(moment());
    return hasJwtFbOnTime ? jwtFbSingleton.getToken().token : this.refreshToken(jwtFbSingleton);
  }
  private async refreshToken(jwtFbSingleton: JwtFbSingleton) {
    let auth = FbAuthSingleton.getInstance().getFbAuth();
    if (!auth){
      const user = this.settingService.user.value;
      await this.authService.login(environment.peama.login, environment.peama.password, user.email);
      auth = FbAuthSingleton.getInstance().getFbAuth();
    }
    const token = await auth.user.getIdTokenResult(true);
    jwtFbSingleton.setToken({ token: token.token, expireTime: moment(token.expirationTime) });
    return token.token;
  }
}
