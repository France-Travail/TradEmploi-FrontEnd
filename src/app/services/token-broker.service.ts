import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TokenBrokerService {
  constructor() {}

  public getFirebaseToken(email: string, password?: string) {
    const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${environment.firebaseConfig.apiKey}`;
    const data = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    return axios({
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      url,
      data,
    })
      .then((response) => {
        return response.data.idToken;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  public getTokenAdmin(firebaseToken: string) {
    const url = `${environment.gcp.gateWayUrl}/token`;
    return axios({
      method: 'POST',
      headers: { Authorization: `Bearer ${firebaseToken}` },
      url,
    })
      .then((response) => {
        return response;
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
