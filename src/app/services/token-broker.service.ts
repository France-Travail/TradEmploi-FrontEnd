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
import { JwtFbSingleton } from '../models/token/JwtFbSingleton';
import { Token } from '../models/token/token';

@Injectable({
  providedIn: 'root',
})
export class TokenBrokerService {

  constructor(private settingService: SettingsService) { }

  public getToken(firebaseToken? : string, role?: Role, roomId?: string): Promise<TokenResponse>{
    const fbToken = firebaseToken ? firebaseToken :  localStorage.getItem('fbtk')
    console.log('fbToken :>> ', fbToken);
    const r = role ?  role : this.settingService.user.value.role
    return r === Role.GUEST ? this.getTokenGuest(fbToken,roomId): this.getTokenAdmin(fbToken)
  }

  // private getFbToken(){
  //   const jwtFbSingleton = JwtFbSingleton.getInstance()
  //   console.log("getFbToken",jwtFbSingleton);
  //   const token = jwtFbSingleton.getToken()
  //   if(token!== null && token.expireTime.isAfter(moment())){
  //     return
  //   }
  //   const url = `${environment.gcp.identityUrlToken}?key=${environment.firebaseConfig.apiKey}`
  //   const data = {
  //     email: token.email,
  //     password: token.password,
  //     returnSecureToken: true,
  //   };

  //   axios({
  //     method: 'POST',
  //     headers: { 'content-type': 'application/json; charset=utf-8' },
  //     url,
  //     data,
  //   })
  //     .then((response) => {
  //       const expiryDate: Moment =  moment().add(response.data.expiresIn, 'milliseconds')
  //       const token:Token = {token: response.data.idToken, expireTime :  expiryDate}
  //       jwtFbSingleton.setToken(token)
  //       console.log('token :>> ', token);
  //     })
  //     .catch((error) => {
  //       throw new Error(error);
  //     });
  // }

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
