import { Injectable } from '@angular/core';
import axios from 'axios';
import { ErrorService } from './error.service';
import { ERROR_TECH_STT } from '../models/error/errorTechnical';
import { ERROR_FUNC_NOSOUND } from '../models/error/errorFunctionnal';
import { TokenBrokerService } from './token-broker.service';
import { TokenResponse } from '../models/token/tokensResponse';
@Injectable({
  providedIn: 'root',
})
export class SpeechToTextSyncService {
  constructor(private readonly errorService: ErrorService, private readonly tbs: TokenBrokerService) {}

  recognizeSync = async (audioBytes: any, language: string): Promise<string> => {
    const tokenResponse: TokenResponse = await this.tbs.getTokenGcp();
    if (audioBytes !== null || audioBytes !== undefined) {
      const urlRecognize = `https://eu-speech.googleapis.com/v1/speech:recognize`;
      const data = {
        config: {
          encoding: 'FLAC',
          sampleRateHertz: 44100,
          languageCode: language,
          enableAutomaticPunctuation: true,
        },
        audio: {
          content: audioBytes,
        },
      };
      return axios.post(urlRecognize, data, {
        headers: { Authorization: `Bearer ${tokenResponse.tokenGCP}`, 'content-type': 'application/json; charset=utf-8' },
        timeout: 60000,
      })
        .then((response) => {
          if (response.data.results !== undefined) {
            return response.data.results[0].alternatives[0].transcript;
          }
          return ERROR_FUNC_NOSOUND.description;
        })
        .catch((error) => {
          this.errorService.save(ERROR_TECH_STT);
          throw new Error(error);
        });
    }
  };
}
