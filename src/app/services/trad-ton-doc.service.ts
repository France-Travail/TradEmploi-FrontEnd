import axios from 'axios';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {TokenBrokerService} from './token-broker.service';
import {TokenResponse} from '../models/token/tokensResponse';

@Injectable({
  providedIn: 'root',
})
export class TradTonDocService {
  constructor(private readonly tbs: TokenBrokerService) {
  }

  detectText = async (fileName: string, content: Blob | string): Promise<any> => {
    const data = {
      fileName,
      bucketName: environment.firebaseConfig.projectId,
      data: content,
    };
    const tokenResponse: TokenResponse = await this.tbs.getTokenGcp();
    const gwToken = tokenResponse.tokenGW;
    const url = `${environment.gcp.gateWayUrl}/detect-text`;
    return axios({
      method: 'post',
      headers: {Authorization: `Bearer ${gwToken}`, 'content-type': 'application/json; charset=utf-8'},
      url,
      data,
    })
      .then((response: any) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}
