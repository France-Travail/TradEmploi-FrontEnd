import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

interface IWindow extends Window {
  webkitSpeechRecognition: any;
  SpeechRecognition: any;
}

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {
  speechRecognition: any;

  constructor(private zone: NgZone) {}

  record(lang: string): Observable<string> {
    // tslint:disable-next-line: deprecation
    return Observable.create(observer => {
      const { webkitSpeechRecognition }: IWindow = window as unknown as IWindow;
      this.speechRecognition = new webkitSpeechRecognition();
      this.speechRecognition.continuous = true;
      this.speechRecognition.lang = lang;
      this.speechRecognition.maxAlternatives = 1;

      this.speechRecognition.onresult = speech => {
        let term: string = '';
        if (speech.results) {
          const result = speech.results[speech.resultIndex];
          const transcript = result[0].transcript;

          if (result.isFinal) {
            if (result[0].confidence < 0.3) {
              console.log('Unrecognized result - Please try again');
            } else {
              term = transcript;
            }
          }
        }
        this.zone.run(() => {
          observer.next(term);
        });
      };

      this.speechRecognition.onerror = error => {
        observer.error(error);
      };

      this.speechRecognition.onend = () => {
        observer.complete();
      };

      this.speechRecognition.start();
      console.log('Start Listening');
    });
  }

  DestroySpeechObject() {
    if (this.speechRecognition) {
      this.speechRecognition.stop();
    }
  }
}
