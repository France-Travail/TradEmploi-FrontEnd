import { Injectable } from '@angular/core';
import axios from 'axios';
import { ErrorService } from './error.service';
import { ERROR_TECH_TTS } from '../models/error/errorTechnical';
import { Voice } from '../models/voice';
import { VoicesService } from './voices.service';
import { VOICES } from '../data/voices';
import { TokenBrokerService } from './token-broker.service';
import { TokenResponse } from '../models/token/tokensResponse';
import { TextToSpeechService } from './text-to-speech.service';

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
export class TextToSpeechGcpService extends TextToSpeechService {
  constructor(private readonly voicesService: VoicesService, private readonly errorService: ErrorService, private readonly tbs: TokenBrokerService) {
    super();
  }

  getSpeech = async (text: string, language: string, isFemaleSpeech: boolean): Promise<void> => {
    this.audioSpeech = undefined;
    const tokenResponse: TokenResponse = await this.tbs.getTokenGcp();
    const urlRecognize = 'https://texttospeech.googleapis.com/v1/text:synthesize';
    let voiceSelected: Voice[] = VOICES.filter((v) => v.languageCodes.includes(language));
    if (voiceSelected.length === 0) {
      const apiVoiceResult = await this.voicesService.getVoices();
      voiceSelected = apiVoiceResult.filter((v) => v.languageCodes.includes(language));
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
      const voice: Voice = isFemaleSpeech ? voiceSelected.find((v) => v.ssmlGender === 'FEMALE')
        : voiceSelected.find((v) => v.ssmlGender === 'MALE');
      data.voice.name = voice === undefined ? isFemaleSpeech ?
          voiceSelected.find((v) => v.ssmlGender === 'MALE').name :
          voiceSelected.find((v) => v.ssmlGender === 'FEMALE').name

        : voice.name;
      return axios({
        method: 'post',
        headers: { Authorization: `Bearer ${tokenResponse.tokenGCP}`, 'content-type': 'application/json; charset=utf-8' },
        url: urlRecognize,
        timeout: 60000,
        data,
      })
        .then((response: any) => {
          this.audioSpeech = new Audio('data:audio/mp3;base64,' + response.data.audioContent);
        })
        .catch((error) => {
          this.errorService.save(ERROR_TECH_TTS);
          throw new Error(error);
        });
    }
  }
}
