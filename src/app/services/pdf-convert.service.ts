import { JwtGwSingleton } from './../models/token/JwtGwSingleton';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as moment from 'moment';
import axios, { AxiosResponse } from 'axios';
import { JwtGcpSingleton } from '../models/token/JwtGcpSingleton';
import { TokenResponse } from '../models/token/tokensResponse';
import { Role } from '../models/role';
import { SettingsService } from './settings.service';
import { TokenFbService } from './token-fb.service';
import { JwtFbSingleton } from '../models/token/JwtFbSingleton';
import { TokenBrokerService } from './token-broker.service';

@Injectable({
  providedIn: 'root',
})
export class PdfConvertService {
  constructor(private readonly tbs: TokenBrokerService) {}

  public async convert(pdfData: string, filename: string) {
    const tokenResponse: TokenResponse = await this.tbs.getTokenGcp();
    const gwToken = tokenResponse.tokenGW;
    const url = `${environment.gcp.gateWayUrl}/pdf-to-image`;
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
