import axios from 'axios';
import {ErrorService} from 'src/app/services/error.service';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {JwtGwSingleton} from '../models/token/JwtGwSingleton';
import {TokenBrokerService} from './token-broker.service';
import {TokenResponse} from '../models/token/tokensResponse';

@Injectable({
  providedIn: 'root',
})
export class TelemetryService {
  constructor(private tbs: TokenBrokerService) {
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
      headers: {Authorization: `Bearer ${gwToken}`, 'content-type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*'},
      url,
    }).catch((error) => {
        throw new Error(error);
      });
  }
}
