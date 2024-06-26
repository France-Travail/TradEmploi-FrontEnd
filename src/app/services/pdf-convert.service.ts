import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import axios from 'axios';
import { TokenResponse } from '../models/token/tokensResponse';
import { TokenBrokerService } from './token-broker.service';

@Injectable({
  providedIn: 'root',
})

export class PdfConvertService {
  constructor(private readonly tbs: TokenBrokerService) {}

  public async convert(pdfData: string, filename: string) {
    const tokenResponse: TokenResponse = await this.tbs.getTokenGcp();
    const gwToken = tokenResponse.tokenGW;
    const url = `${environment.gcp.gateWayUrl}/pdf-image`;
    const data = {
      data: pdfData,
      fileName: filename,
    };
    return axios({
      method: 'post',
      headers: { Authorization: `Bearer ${gwToken}`, 'content-type': 'application/json; charset=utf-8' },
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
