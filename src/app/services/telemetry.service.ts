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

  public async logPeama(idDGASI: string) {

    const tokenResponse: TokenResponse = await this.tbs.getTokenGcp();
    const gwToken = tokenResponse.tokenGW;
    const url = `${environment.gcp.gateWayUrl}/telemetry`;

    const params = {
      idDGASI
    };
    return axios({
      method: 'GET',
      params,
      headers: { Authorization: `Bearer ${gwToken}`, 'content-type': 'application/json; charset=utf-8' },
      url
    }).catch((error) => {
      throw new Error(error);
    });
  }
}
