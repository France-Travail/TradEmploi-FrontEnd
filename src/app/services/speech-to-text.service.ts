import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { TokenResponse } from '../models/token/tokensResponse';
import { JwtFbSingleton } from '../models/token/JwtFbSingleton';
import { TokenBrokerService } from './token-broker.service';

@Injectable({
  providedIn: 'root',
})
export class SpeechToTextService {
  constructor(private readonly tbs: TokenBrokerService) {}
  recognizeAsync = async (audioBytes: any, language: string, time: number): Promise<Observable<string>> => {
    const tokenResponse: TokenResponse = await this.tbs.getTokenAdmin(JwtFbSingleton.getInstance().getToken().token);
    const urlRecognize = `https://speech.googleapis.com/v1/speech:longrunningrecognize`;
    const data = {
      config: {
        encoding: 'FLAC',
        sampleRateHertz: 44100,
        languageCode: language,
      },
      audio: {
        content: audioBytes,
      },
    };
    return new Observable((observer) => {
      axios({
        method: 'post',
        headers: { Authorization: `Bearer ${tokenResponse.tokenGCP}`, 'content-type': 'application/json; charset=utf-8' },
        url: urlRecognize,
        data,
      })
        .then((operation) => {
          const urlOperation = `https://speech.googleapis.com/v1/operations/${operation.data.name}`;
          const wait = this.getWaitTime(time);
          setTimeout(() => {
            axios({
              method: 'get',
              headers: { Authorization: `Bearer ${tokenResponse.tokenGCP}`, 'content-type': 'application/json; charset=utf-8' },
              url: urlOperation,
            })
              .then((res) => {
                const transcription =
                  res.data.response === undefined || res.data.response.results === undefined ? '' : res.data.response.results.map((result) => result.alternatives[0].transcript).join('');
                observer.next(transcription);
                observer.complete();
              })
              .catch((error) => {
                observer.error(error);
                throw new Error('An error occurred when api speech to text get operation called');
              });
          }, wait);
        })
        .catch((error) => {
          observer.error(error);
          throw new Error(error);
        });
    });
  };

  private readonly getWaitTime = (time: number): number => {
    return (time / 2) * 1000;
  };
}
