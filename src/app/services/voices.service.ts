import { ERROR_TECH_GET_VOICE } from './../models/error/errorTechnical';
import axios from 'axios';
import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { Voice } from '../models/voice';
import { TokenResponse } from '../models/token/tokensResponse';
import { TokenBrokerService } from './token-broker.service';

@Injectable({
  providedIn: 'root'
})
export class VoicesService {
  constructor(private readonly errorService: ErrorService, private readonly tbs: TokenBrokerService) {
  }

  async getVoices(): Promise<Array<Voice>> {
    const tokenResponse: TokenResponse = await this.tbs.getTokenGcp();
    const urlVoice: string = `https://texttospeech.googleapis.com/v1/voices`;
    return axios({
      method: 'get',
      headers: { Authorization: `Bearer ${tokenResponse.tokenGCP}`, 'content-type': 'application/json; charset=utf-8' },
      url: urlVoice
    })
      .then((response: any) => {
        return response.data.voices;
      })
      .catch((error) => {
        this.errorService.save(ERROR_TECH_GET_VOICE);
        throw new Error(error);
      });
  }
}
