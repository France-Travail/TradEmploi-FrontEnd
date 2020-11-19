import { ERROR_TECH_GET_VOICE } from './../models/error/errorTechnical';
import axios  from 'axios';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';
import { Voice } from '../models/voice';

@Injectable({
  providedIn: 'root'
})
export class VoicesService {

  constructor(private errorService: ErrorService) {}

  getVoices():Promise<Array<Voice>> {
    const urlVoice: string = `https://texttospeech.googleapis.com/v1beta1/voices?key=${environment.gcp.apiKey}`;
    return axios({
        method: 'get',
        url: urlVoice
      })
        .then((response: any) => {
          return  response.data.voices
        })
        .catch(error => {
          this.errorService.save(ERROR_TECH_GET_VOICE)
          throw new Error(error);
        });
  }
}


