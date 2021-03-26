import { JwtGwSingleton } from './../models/token/JwtGwSingleton';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as moment from 'moment';
import axios from 'axios';
import { Moment } from 'moment';
import { JwtGcpSingleton } from '../models/token/JwtGcpSingleton';
import { TokenResponse } from '../models/token/tokensResponse';
import { Role } from '../models/role';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class TokenBrokerService {

  constructor(private settingService: SettingsService) { }


  public getToken(firebaseToken: string, role?: Role, roomId?: string): Promise<TokenResponse>{
    const r = role ?  role : this.settingService.user.value.role
    console.log("getToken");
    return r === Role.GUEST ? this.getTokenGuest(firebaseToken, roomId): this.getTokenAdmin(firebaseToken)
  }

  private getTokenAdmin(firebaseToken: string): Promise<TokenResponse> {
    const jwtGwSingleton = JwtGwSingleton.getInstance();
    const jwtGcpSingleton = JwtGcpSingleton.getInstance();
    const hasJwtGwOnTime = jwtGwSingleton.getToken() !== null && jwtGwSingleton.getToken().expireTime.isAfter(moment());
    const hasJwtGcpOnTime = jwtGcpSingleton.getToken() !== null && jwtGcpSingleton.getToken().expireTime.isAfter(moment());
    if (hasJwtGwOnTime || hasJwtGcpOnTime) {
      return new Promise<TokenResponse>((resolve) => {
        resolve({ tokenGCP: jwtGcpSingleton.getToken().token, tokenGW: jwtGwSingleton.getToken().token });
      });
    }
    const url = `${environment.gcp.gateWayUrl}/token`;
    return axios({
      method: 'POST',
      headers: { Authorization: `Bearer ${firebaseToken}` },
      url,
    })
      .then((response) => {
        const data = response.data;
        const expiryDateGW: Moment = moment().add(data.apiGateway.expireTime, 'seconds');
        const tokenGW = { token: data.apiGateway.token, expireTime: expiryDateGW };
        jwtGwSingleton.setToken(tokenGW);
        const expiryDateGCP: Moment = moment().add(data.gcp.expireTime.seconds, 'seconds');
        const tokenGCP = { token: data.gcp.token, expireTime: expiryDateGCP };
        jwtGcpSingleton.setToken(tokenGCP);
        console.log('jwtGwSingleton :>> ', jwtGwSingleton);
        console.log('jwtGcpSingleton :>> ', jwtGcpSingleton);
        return {
          tokenGCP: JwtGcpSingleton.getInstance().getToken().token,
          tokenGW: JwtGwSingleton.getInstance().getToken().token,
        };
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  private getTokenGuest(firebaseToken: string, roomId: string): Promise<TokenResponse> {
    const jwtGcpSingleton = JwtGcpSingleton.getInstance();
    const hasJwtGcpOnTime = jwtGcpSingleton.getToken() !== null && jwtGcpSingleton.getToken().expireTime.isAfter(moment());
    if (hasJwtGcpOnTime) {
      return new Promise<TokenResponse>((resolve) => {
        resolve({ tokenGCP: jwtGcpSingleton.getToken().token, tokenGW: null });
      });
    }
    const url = `${environment.gcp.gateWayUrl}/token`;
    const data = {
      roomId: roomId,
    };
    console.log('data :>> ', data);
    return axios({
      method: 'POST',
      headers: { Authorization: `Bearer ${firebaseToken}` },
      data,
      url,
    })
      .then((response) => {
        const data = response.data;
        const expiryDateGCP: Moment = moment().add(data.gcp.expireTime.seconds, 'seconds');
        const tokenGCP = { token: data.gcp.token, expireTime: expiryDateGCP };
        jwtGcpSingleton.setToken(tokenGCP);
        console.log('jwtGcpSingleton :>> ', jwtGcpSingleton);
        return {
          tokenGCP: JwtGcpSingleton.getInstance().getToken().token,
          tokenGW: null
        };
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}
