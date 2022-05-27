import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {JwtFbSingleton} from '../models/token/JwtFbSingleton';
import {FbAuthSingleton} from '../models/token/FbAuthSingleton';
import {SettingsService} from './settings.service';
import {AuthService} from './auth.service';
import {params} from '../../environments/params';

@Injectable({
  providedIn: 'root',
})
export class TokenFbService {
  constructor(private readonly settingService: SettingsService, private readonly authService: AuthService) {
  }

  public async getTokenFb(): Promise<string> {
    const jwtFbSingleton = JwtFbSingleton.getInstance();
    const hasJwtFbOnTime = jwtFbSingleton.getToken() !== null && jwtFbSingleton.getToken().expireTime.isAfter(moment());
    return hasJwtFbOnTime ? jwtFbSingleton.getToken().token : this.refreshToken(jwtFbSingleton);
  }

  private async refreshToken(jwtFbSingleton: JwtFbSingleton) {
    let auth = FbAuthSingleton.getInstance().getFbAuth();
    if (!auth) {
      const user = this.settingService.user.value;
      await this.authService.login(user.email, params.defaultPassword);
      auth = FbAuthSingleton.getInstance().getFbAuth();
    }
    const token = await auth.user.getIdTokenResult(true);
    jwtFbSingleton.setToken({token: token.token, expireTime: moment(token.expirationTime)});
    return token.token;
  }
}
