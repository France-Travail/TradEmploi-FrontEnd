import {Injectable} from '@angular/core';
import {AudioConfig, CancellationReason, ResultReason, SpeechConfig, SpeechRecognizer} from 'microsoft-cognitiveservices-speech-sdk';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpeechToTextMicrosoftService {

  private recognizer: SpeechRecognizer;

  recognize(language: string): Observable<string> {
    return new Observable((observer) => {
      const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
      const speechConfig = SpeechConfig.fromSubscription(environment.microsoftSpeechConfig.key, environment.microsoftSpeechConfig.region);
      speechConfig.speechRecognitionLanguage = language;
      speechConfig.enableDictation();
      this.recognizer = new SpeechRecognizer(speechConfig, audioConfig);

      this.recognizer.recognized = (s, e) => {
        if (e.result.reason === ResultReason.RecognizedSpeech) {
          observer.next(e.result.text);
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
