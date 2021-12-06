import { Injectable } from '@angular/core';
import {
  AudioConfig,
  CancellationReason,
  ProfanityOption,
  ResultReason,
  SpeechConfig,
  SpeechRecognizer
} from 'microsoft-cognitiveservices-speech-sdk';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Stream } from '../models/stream';

@Injectable({
  providedIn: 'root'
})
export class SpeechToTextMicrosoftService {

  private recognizer: SpeechRecognizer;

  recognize(language: string): Observable<Stream> {
    return new Observable((observer) => {
      const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
      const speechConfig = SpeechConfig.fromSubscription(environment.microsoftSpeechConfig.key, environment.microsoftSpeechConfig.region);
      speechConfig.speechRecognitionLanguage = language;
      speechConfig.enableDictation();
      speechConfig.setProfanity(ProfanityOption.Masked);
      this.recognizer = new SpeechRecognizer(speechConfig, audioConfig);
      let interimTranscript = '';
      let finalTranscript = '';
      this.recognizer.recognized = (s, e) => {
        if (e.result.reason === ResultReason.RecognizedSpeech) {
          finalTranscript = e.result.text;
          interimTranscript = '';
          observer.next({ final: finalTranscript, interim: interimTranscript });
        }
        else if (e.result.reason === ResultReason.NoMatch) {
          observer.next({ final: '', interim: '' });
        }
      };
      this.recognizer.recognizing = (s, e) => {
        if (e.result.reason === ResultReason.RecognizingSpeech) {
          finalTranscript = '';
          interimTranscript = e.result.text;
          observer.next({ final: finalTranscript, interim: interimTranscript });
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

      this.recognizer.startContinuousRecognitionAsync();

    });
  }

  stopContinuousRecognitionAsync() {
    if (this.recognizer) {
      this.recognizer.stopContinuousRecognitionAsync();
    }
  }
}
