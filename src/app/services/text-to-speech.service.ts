import { ERROR_TECH_TTS } from './../models/error/errorTechnical';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VoicesService } from './voices.service';
import { environment } from 'src/environments/environment';
import { Voice } from '../models/voice';
import { ErrorService } from './error.service';
import { ToastService } from './toast.service';
import { ERROR_FUNC_TTS } from '../models/error/errorFunctionnal';

interface Body {
  audioConfig: {
    audioEncoding: string;
    pitch: number;
    speakingRate: number;
    volumeGainDb?: number;
    sampleRateHertz?: number;
    effectsProfileId?: Array<string>;
  };
  input: {
    text: string;
    ssml?: string;
  };
  voice: {
    languageCode: string;
    name?: string;
    ssmlGender?: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class TextToSpeechService {
  private url: string = 'https://texttospeech2.googleapis.com/v1beta1/text:synthesize';
  public guestVoiceGender: string = 'MALE';
  public advisorVoiceGender: string = 'MALE';
  public audioSpeech: HTMLAudioElement = undefined;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient, private voicesService: VoicesService, private errorService: ErrorService) {}

  public async getSpeech(text: string, language: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const url = `${this.url}?key=${environment.gcp.apiKey}`;
      const names: Voice[] = [];

      this.voicesService.voicesList.forEach((voice) => {
        if (voice.languageCodes.includes(language) /*&& voice.name.includes('Wavenet')*/) {
          names.push(voice);
        }
      });

      const body: Body = {
        audioConfig: {
          audioEncoding: 'MP3',
          pitch: 0,
          speakingRate: 1,
        },
        input: {
          text,
        },
        voice: {
          languageCode: language,
        },
      };

      if (names.length >= 1) {
        const voice: Voice = names.find((v) => v.ssmlGender === 'MALE');
        body.voice.name = voice === undefined ? names.find((v) => v.ssmlGender === 'FEMALE').name : voice.name;
        this.httpClient.post<any>(url, body, this.httpOptions).subscribe(
          (response) => {
            this.audioSpeech = new Audio('data:audio/mp3;base64,' + response.audioContent);
            resolve(true);
          },
          (error) => {
            resolve(false);
            throw new Error(error.message);
          }
        );
      } else {
        resolve(false);
      }
    });
  }
}
