import axios from 'axios';
import { Injectable } from '@angular/core';
import { TokenBrokerService } from './token-broker.service';
import { TokenResponse } from '../models/token/tokensResponse';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TelemetryService {
  constructor(private readonly tbs: TokenBrokerService) {
  }

  public async logUser(hashedEmail: string) {

    const tokenResponse: TokenResponse = await this.tbs.getTokenGcp();
    const gwToken = tokenResponse ? tokenResponse.tokenGW : '';
    const url = `${environment.gcp.gateWayUrl}/telemetry`;
    const params = {
      hashedEmail
    };
    return axios.get(url, {
      params,
      withCredentials: true,
      headers: { Authorization: `Bearer ${gwToken}`, 'content-type': 'application/json; charset=utf-8' }
    }).catch((error) => {
      throw new Error(error);
    });
  }
}
