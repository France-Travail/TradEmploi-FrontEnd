import { JwtGwSingleton } from './../models/token/JwtGwSingleton';
import { JwtFbSingleton } from './../models/token/JwtFbSingleton';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import axios from 'axios';
import * as moment from 'moment'
import { Token } from '../models/token/token';
import { Moment } from 'moment';
import { JwtGcpSingleton } from '../models/token/JwtGcpSingleton';
@Injectable({
  providedIn: 'root',
})
export class TokenBrokerService {

  public getFbToken(email: string, password?: string){
    const jwtFbSingleton = JwtFbSingleton.getInstance()
    if(jwtFbSingleton.getToken() === null || jwtFbSingleton.getToken().expireTime.isAfter(moment())){
      const url = `${environment.gcp.identityUrlToken}?key=${environment.firebaseConfig.apiKey}`
      const data = {
        email: email,
        password: password,
        returnSecureToken: true,
      };

      axios({
        method: 'POST',
        headers: { 'content-type': 'application/json; charset=utf-8' },
        url,
        data,
      })
        .then((response) => {
          const expiryDate: Moment =  moment().add(response.data.expiresIn, 'seconds')
          const token:Token = {token: response.data.idToken, expireTime :  expiryDate}
          jwtFbSingleton.setToken(token)
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  }

  public getTokenAdmin(firebaseToken: string) {
    const jwtGwSingleton = JwtGwSingleton.getInstance()
    const jwtGcpSingleton = JwtGcpSingleton.getInstance()


    
    if(jwtGwSingleton.getToken()=== null || jwtGwSingleton.getToken().expireTime.isAfter(moment())){
      const url = `${environment.gcp.gateWayUrl}/token`;
      return axios({
        method: 'POST',
        headers: { Authorization: `Bearer ${firebaseToken}` },
        url,
      })
        .then((response) => {
          const data = response.data
          const expiryDateGW: Moment =  moment().add(data.apiGateway.expireTime, 'seconds')
          const tokenGW = {token:  data.apiGateway.token, expireTime:  expiryDateGW}
          jwtGwSingleton.setToken(tokenGW)
 
          const expiryDateGCP: Moment =  moment().add(data.gcp.expireTime.seconds, 'seconds')
          const tokenGCP = {token:  data.gcp.token, expireTime:  expiryDateGCP}
          jwtGcpSingleton.setToken(tokenGCP)
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
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
