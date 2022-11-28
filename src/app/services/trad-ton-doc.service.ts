import axios from 'axios';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {TokenBrokerService} from './token-broker.service';
import {TokenResponse} from '../models/token/tokensResponse';

@Injectable({
  providedIn: 'root'
})
export class TradTonDocService {
  constructor(private readonly tbs: TokenBrokerService) {
  }

  detectText = async (fileName: any, content: any): Promise<any> => {
    const data = {
      fileName: 'images/' + fileName,
      bucketName: 'trad-ton-doc-bucket',
      data: content,
    };
    const tokenResponse: TokenResponse = await this.tbs.getTokenGcp();
    const gwToken = tokenResponse.tokenGW;
   // const url = `${environment.gcp.gateWayUrl}/detect-text`;
    const url = 'https://pe-detect-text-nnyd6fjjpq-ew.a.run.app';
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
