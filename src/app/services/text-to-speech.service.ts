// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VoicesService } from './voices.service';
import { environment } from 'src/environments/environment.prod';
import { Voice } from '../models/voice';

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
  providedIn: 'root'
})
export class TextToSpeechService {
  private synth: SpeechSynthesis = window.speechSynthesis;
  private voices: SpeechSynthesisVoice[];
  private url: string = 'https://texttospeech.googleapis.com/v1beta1/text:synthesize';

  public guestVoiceGender: string = 'MALE';
  public advisorVoiceGender: string = 'MALE';
  public audioSpeech: HTMLAudioElement;
  public keyboardSpeech: HTMLAudioElement;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient, private voicesService: VoicesService) {
    this.init();
  }

  init = async () => {
    this.voices = await this.getVoices();
  };

  private getVoices(): Promise<SpeechSynthesisVoice[]> {
    return new Promise((resolve, reject) => {
      let id: any;
      id = setInterval(() => {
        if (this.synth.getVoices().length !== 0) {
          resolve(this.synth.getVoices());
          clearInterval(id);
        }
      }, 10);
    });
  }

  public speak(message: string, language: string): void {
    if (this.synth.speaking) {
      this.synth.cancel();
    } else {
      const speech = new SpeechSynthesisUtterance(message);

      speech.voice = this.voices.find(voice => voice.lang === language);
      speech.pitch = 1;
      speech.rate = 0.9;
      speech.volume = 1;

      this.synth.speak(speech);
    }
  }

  public stopSpeaking(): void {
    if (this.synth.speaking) {
      this.synth.cancel();
    }
  }

  public isSpeaking(): boolean {
    return this.synth.speaking;
  }

  public async getSpeech(text: string, language: string, user: string, fromKeyboard: boolean): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const url = `${this.url}?key=${environment.gcp.apiKey}`;

      const GENDER = user === 'advisor' ? this.guestVoiceGender : this.advisorVoiceGender;
      const SECOND_GENDER = GENDER === 'MALE' ? 'FEMALE' : 'MALE';
      const names: Voice[] = [];

      this.voicesService.voicesList.forEach(voice => {
        if (voice.languageCodes.includes(language) && voice.name.includes('Wavenet')) {
          names.push(voice);
        }
      });

      const body: Body = {
        audioConfig: {
          audioEncoding: 'MP3',
          pitch: 0,
          speakingRate: 1
        },
        input: {
          text
        },
        voice: {
          languageCode: language
        }
      };
      if (names.length >= 1) {
        const voice: Voice = names.find(v => v.ssmlGender === GENDER);
        body.voice.name = voice === undefined ? names.find(v => v.ssmlGender === SECOND_GENDER).name : voice.name;
      } else {
        console.log('NO WAVENET VOICE FOUNDED');
      }

      this.httpClient.post<any>(url, body, this.httpOptions).subscribe(
        response => {
          if (fromKeyboard) {
            this.keyboardSpeech = new Audio('data:audio/mp3;base64,' + response.audioContent);
          } else {
            this.audioSpeech = new Audio('data:audio/mp3;base64,' + response.audioContent);
          }
          resolve(true);
        },
        error => {
          resolve(false);
        }
      );
    });
  }
}
