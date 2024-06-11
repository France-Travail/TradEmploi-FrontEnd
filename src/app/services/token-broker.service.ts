import { JwtGwSingleton } from '../models/token/JwtGwSingleton';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import axios, { AxiosResponse } from 'axios';
import { JwtGcpSingleton } from '../models/token/JwtGcpSingleton';
import { TokenResponse } from '../models/token/tokensResponse';
import { Role } from '../models/role';
import { SettingsService } from './settings.service';
import { TokenFbService } from './token-fb.service';
import { JwtFbSingleton } from '../models/token/JwtFbSingleton';
import moment from 'moment';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenBrokerService {
  constructor(private readonly settingService: SettingsService, private readonly tbFbs: TokenFbService, private readonly router: Router, private readonly cookieService: CookieService) {
  }

  public async getTokenGcp(): Promise<TokenResponse> {
    const user = this.settingService.user.value;
    let fbToken;
    try {
       fbToken = await this.tbFbs.getTokenFb();
    } catch (reason) {
      this.handleConnexionError(reason);
    }

    const tokenResponsePromise = (user && user.role === Role.GUEST) ? this.getTokenGuest(fbToken, user.roomId) : this.getTokenAdmin(fbToken);
    return tokenResponsePromise
          .catch(reason => {
            this.handleConnexionError(reason);
            throw new Error(reason);
          });
  }

  private handleConnexionError(reason) {
    console.error(reason);
    sessionStorage.setItem('redirectUrl', this.router.routerState.snapshot.url);
    this.router.navigate(['auth']);
  }

  public addGuest(fbToken: string, roomId: string, firstname: string) {
    const url = `${environment.gcp.gateWayUrl}/token`;
    const data = {
      roomId,
      firstname
    };
    return axios.post(url, data, {
      headers: { Authorization: `Bearer ${fbToken}` }});
  }

  getTokenAdmin(firebaseToken: string): Promise<TokenResponse> {
    const jwtGwSingleton = JwtGwSingleton.getInstance();
    const jwtGcpSingleton = JwtGcpSingleton.getInstance();
    if (this.getHasJwtGwOnTime(jwtGwSingleton) || this.getHasJwtGcpOnTime(jwtGcpSingleton)) {
      return Promise.resolve({ tokenGCP: jwtGcpSingleton.getToken().token, tokenGW: jwtGwSingleton.getToken().token });
    }
    const url = `${environment.gcp.gateWayUrl}/token`;
    return axios({
      method: 'POST',
      withCredentials: true,
      headers: { Authorization: `Bearer ${firebaseToken}`, 'Content-Type': 'text/plain' },
      url: url,
    })
      .then((response) => {
        return this.getToken(response, jwtGwSingleton, jwtGcpSingleton);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  private getHasJwtGcpOnTime(jwtGcpSingleton: JwtGcpSingleton) {
    return jwtGcpSingleton.getToken() !== null && jwtGcpSingleton.getToken().expireTime.isAfter(moment());
  }

  private getHasJwtGwOnTime(jwtGwSingleton: JwtGwSingleton) {
    return jwtGwSingleton.getToken() !== null && jwtGwSingleton.getToken().expireTime.isAfter(moment());
  }

  private getTokenGuest(firebaseToken: string, roomId: string): Promise<TokenResponse> {
    const jwtGwSingleton = JwtGwSingleton.getInstance();
    const jwtGcpSingleton = JwtGcpSingleton.getInstance();
    if (this.getHasJwtGwOnTime(jwtGwSingleton) || this.getHasJwtGcpOnTime(jwtGcpSingleton)) {
      return Promise.resolve({ tokenGCP: jwtGcpSingleton.getToken().token, tokenGW: jwtGwSingleton.getToken().token });
    }
    const url = `${environment.gcp.gateWayUrl}/token`;
    const data = {
      roomId
    };
    return axios.post(url, data, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${firebaseToken}` },
    })
      .then((response) => {
        return this.getToken(response, jwtGwSingleton, jwtGcpSingleton);
      });
  }

  private getToken(response: AxiosResponse, jwtGwSingleton: JwtGwSingleton, jwtGcpSingleton: JwtGcpSingleton) {
    const d = response.data;
    axios.defaults.headers.common['X-CSRF-TOKEN'] = this.cookieService.get('csrfToken');
    const expireTime = JwtFbSingleton.getInstance().getToken().expireTime;
    const tokenGW = { token: d.apiGateway.token, expireTime };
    jwtGwSingleton.setToken(tokenGW);
    const tokenGCP = { token: d.gcp.token, expireTime };
    jwtGcpSingleton.setToken(tokenGCP);
    return {
      tokenGCP: JwtGcpSingleton.getInstance().getToken().token,
      tokenGW: JwtGwSingleton.getInstance().getToken().token,
    };
  }
}
