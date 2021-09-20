import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { Stream } from '../models/stream';

interface IWindow extends Window {
  webkitSpeechRecognition: any;
  SpeechRecognition: any;
}

@Injectable({
  providedIn: 'root',
})
export class SpeechRecognitionService {
  speechRecognition: any;

  constructor(private zone: NgZone) {}

  record(lang: string): Observable<Stream> {
    return new Observable((observer) => {
      const { webkitSpeechRecognition }: IWindow = (window as unknown) as IWindow;
      this.speechRecognition = new webkitSpeechRecognition();
      this.speechRecognition.continuous = true;
      this.speechRecognition.interimResults = true;
      this.speechRecognition.lang = lang;
      this.speechRecognition.maxAlternatives = 1;

      this.speechRecognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        this.zone.run(() => {
          observer.next({ final: finalTranscript, interim: interimTranscript });
        });
      };

      this.speechRecognition.onerror = (_) => {
        observer.error();
      };

      this.speechRecognition.onend = () => {
        observer.complete();
      };

      this.speechRecognition.start();
    });
  }

  DestroySpeechObject() {
    if (this.speechRecognition) {
      this.speechRecognition.stop();
    }
  }

  capitalize = (s) => {
    const firstChar = /\S/;
    return s.replace(firstChar, (m) => {
      return m.toUpperCase();
    });
  }
}
