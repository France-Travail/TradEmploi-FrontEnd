import axios from 'axios';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { TokenBrokerService } from './token-broker.service';
import { TokenResponse } from '../models/token/tokensResponse';

@Injectable({
  providedIn: 'root'
})
export class TelemetryService {
  constructor(private readonly tbs: TokenBrokerService) {
  }

  public async logUser(idDGASI: string) {

    const tokenResponse: TokenResponse = await this.tbs.getTokenGcp();
    const gwToken = tokenResponse ? tokenResponse.tokenGW : '';
    const url = `http://localhost:8082/`;

    const params = {
      idDGASI
    };
    return axios.get(url, {
      params,
      withCredentials: true,
      headers: { Authorization: `Bearer ${gwToken}`, 'content-type': 'application/json; charset=utf-8' },
    }).catch((error) => {
      throw new Error(error);
    });
  }
}
