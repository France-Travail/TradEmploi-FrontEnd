import {Injectable} from '@angular/core';
import {
  AudioConfig,
  CancellationReason,
  ProfanityOption,
  ResultReason,
  SpeechConfig,
  SpeechRecognizer
} from 'microsoft-cognitiveservices-speech-sdk';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Stream} from '../models/stream';
import {TokenAzureService} from './token-azure.service';

@Injectable({
  providedIn: 'root'
})
export class SpeechToTextMicrosoftService {
  constructor(private readonly tokenAzureService: TokenAzureService) {
  }

  private recognizer: SpeechRecognizer;

  private starting = false;
  private preventStart = false;


  async recognize(language: string): Promise<Observable<Stream>> {
    this.starting = true;
    console.log('Azure Stream starting');
    const authorizationToken = await this.tokenAzureService.getToken();
    return new Observable((observer) => {
      const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
      const speechConfig = SpeechConfig.fromAuthorizationToken(authorizationToken, environment.microsoftSpeechConfig.region);
      speechConfig.speechRecognitionLanguage = language;
      speechConfig.enableDictation();
      speechConfig.setProfanity(ProfanityOption.Raw);
      speechConfig.endpointId = environment.microsoftSpeechConfig.endpoints[language];
      this.recognizer = new SpeechRecognizer(speechConfig, audioConfig);
      let interimTranscript = '';
      let finalTranscript = '';
      this.recognizer.recognized = (s, e) => {
        if (e.result.reason === ResultReason.RecognizedSpeech) {
          finalTranscript = e.result.text;
          interimTranscript = '';
          observer.next({final: finalTranscript, interim: interimTranscript});
        } else if (e.result.reason === ResultReason.NoMatch) {
          observer.next({final: '', interim: ''});
        }
      };
      this.recognizer.recognizing = (s, e) => {
        if (e.result.reason === ResultReason.RecognizingSpeech) {
          finalTranscript = '';
          interimTranscript = e.result.text;
          observer.next({final: finalTranscript, interim: interimTranscript});
        }
      };

      this.recognizer.canceled = (s, e) => {
        if (e.reason === CancellationReason.Error) {
          observer.error(e);
        }

        this.stopContinuousRecognitionAsync();
      };

      this.recognizer.sessionStopped = (s, e) => {
        this.recognizer.stopContinuousRecognitionAsync();
      };

      if (!this.preventStart) {
        this.recognizer.startContinuousRecognitionAsync();
      } else {
        console.log('Prevent azure Stream starting - already stopped');
      }
      this.starting = false;
      this.preventStart = false;
    });
  }

  stopContinuousRecognitionAsync() {
    console.log('Azure Stream Stopping');
    if (this.recognizer) {
      this.recognizer.stopContinuousRecognitionAsync();
    } else if (this.starting) {
      this.preventStart = true;
    }
  }
}
