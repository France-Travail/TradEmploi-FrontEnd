import { JwtGwSingleton } from './../models/token/JwtGwSingleton';
import { JwtFbSingleton } from './../models/token/JwtFbSingleton';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import axios from 'axios';
import * as moment from 'moment';
import { Token } from '../models/token/token';
import { Moment } from 'moment';
import { JwtGcpSingleton } from '../models/token/JwtGcpSingleton';
import { TokenResponse } from '../models/token/tokensResponse';

@Injectable({
  providedIn: 'root',
})
export class TokenBrokerService {
 
  public async getTokenAdmin(firebaseToken: string): Promise<TokenResponse> {
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
        return {
          tokenGCP: JwtGcpSingleton.getInstance().getToken().token,
          tokenGW: JwtGwSingleton.getInstance().getToken().token,
        };
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  public getTokenGuest(firebaseToken: string, roomId: string) {
    const url = `${environment.gcp.gateWayUrl}/token`;
    const data = {
      roomId: roomId,
    };
    return axios({
      method: 'POST',
      headers: { Authorization: `Bearer ${firebaseToken}` },
      url,
      data,
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}
