import axios from 'axios';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {TokenBrokerService} from './token-broker.service';
import {TokenResponse} from '../models/token/tokensResponse';

@Injectable({
  providedIn: 'root',
})
export class PdfToImageService {
  constructor(private readonly tbs: TokenBrokerService) {
  }

  convertPdfToImage = async (fileName: string, content: Blob | string): Promise<any> => {
    const data = {
      fileName,
      data: content,
    };
    const tokenResponse: TokenResponse = await this.tbs.getTokenGcp();
    const gwToken = tokenResponse.tokenGW;
    const url = `${environment.gcp.gateWayUrl}/pdf-to-image`;
    return axios({
      method: 'post',
      headers: {Authorization: `Bearer ${gwToken}`, 'content-type': 'application/json; charset=utf-8'},
      responseType: 'arraybuffer',
      url,
      data,
    })
      .then((response: any) => {
        return `data:${response.headers['content-type']};base64,
        ${btoa(String.fromCharCode(...new Uint8Array(response.data)))}`;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}
