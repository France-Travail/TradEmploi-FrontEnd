import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';
import { ERROR_TECH_TTS } from '../models/error/errorTechnical';
import { Voice } from '../models/voice';
import { VoicesService } from './voices.service';
import { VOICES } from '../data/voices';

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

    public audioSpeech: HTMLAudioElement = undefined;

    constructor(private voicesService: VoicesService, private errorService: ErrorService) {}

    getSpeech = async (text: string, language: string): Promise<void> => {
      const urlRecognize: string = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${environment.gcp.apiKey}`;
      let voiceSelected: Voice[] = VOICES.filter(v => v.languageCodes.includes(language));
      if(voiceSelected.length === 0 ){
        const apiVoiceResult = await this.voicesService.getVoices();
        voiceSelected = apiVoiceResult.filter(v => v.languageCodes.includes(language));
      }
      const data: Body = {
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
      if (voiceSelected.length >= 1) {
        const voice: Voice = voiceSelected.find((v) => v.ssmlGender === 'MALE');
        data.voice.name = voice === undefined ? voiceSelected.find((v) => v.ssmlGender === 'FEMALE').name : voice.name;
        return axios({
            method: 'post',
            headers: { 'content-type': 'application/json; charset=utf-8' },
            url: urlRecognize,
            timeout: 60000,
            data,
          })
            .then((response: any) => {
              this.audioSpeech = new Audio('data:audio/mp3;base64,' + response.data.audioContent);
            })
            .catch(error => {
              this.errorService.save(ERROR_TECH_TTS);
              throw new Error(error);
            });

      }
    }
}
