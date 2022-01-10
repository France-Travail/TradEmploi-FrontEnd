import { JwtGwSingleton } from './../models/token/JwtGwSingleton';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as moment from 'moment';
import axios, { AxiosResponse } from 'axios';
import { JwtGcpSingleton } from '../models/token/JwtGcpSingleton';
import { TokenResponse } from '../models/token/tokensResponse';
import { Role } from '../models/role';
import { SettingsService } from './settings.service';
import { TokenFbService } from './token-fb.service';
import { JwtFbSingleton } from '../models/token/JwtFbSingleton';

@Injectable({
  providedIn: 'root'
})
export class TokenBrokerService {
  constructor(private readonly settingService: SettingsService, private readonly tbFbs: TokenFbService) {
  }

  public async getTokenGcp(): Promise<TokenResponse> {
    const user = this.settingService.user.value;
    const fbToken = await this.tbFbs.getTokenFb();
    return (user && user.role === Role.GUEST) ? this.getTokenGuest(fbToken, user.roomId) : this.getTokenAdmin(fbToken);
  }

  public addGuest(fbToken: string, roomId: string, firstname: string) {
    const url = `${environment.gcp.gateWayUrl}/token`;
    const data = {
      roomId,
      firstname
    };
    return axios({
      method: 'POST',
      headers: { Authorization: `Bearer ${fbToken}` },
      data,
      url
    })
      .catch((error) => {
        throw new Error(error);
      });
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
      headers: { Authorization: `Bearer ${firebaseToken}` },
      url
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
    return axios({
      method: 'POST',
      headers: { Authorization: `Bearer ${firebaseToken}` },
      data,
      url
    })
      .then((response) => {
        return this.getToken(response, jwtGwSingleton, jwtGcpSingleton);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  private getToken(response: AxiosResponse, jwtGwSingleton: JwtGwSingleton, jwtGcpSingleton: JwtGcpSingleton) {
    const d = response.data;
    const expireTime = JwtFbSingleton.getInstance().getToken().expireTime;
    const tokenGW = { token: d.apiGateway.token, expireTime };
    jwtGwSingleton.setToken(tokenGW);
    const tokenGCP = { token: d.gcp.token, expireTime };
    jwtGcpSingleton.setToken(tokenGCP);
    return {
      tokenGCP: JwtGcpSingleton.getInstance().getToken().token,
      tokenGW: JwtGwSingleton.getInstance().getToken().token
    };
  }
}
