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
    // tslint:disable-next-line: deprecation
    return Observable.create((observer) => {
      const { webkitSpeechRecognition }: IWindow = (window as unknown) as IWindow;
      this.speechRecognition = new webkitSpeechRecognition();
      this.speechRecognition.continuous = true;
      this.speechRecognition.interimResults = true;
      this.speechRecognition.lang = lang;
      this.speechRecognition.maxAlternatives = 1;

      this.speechRecognition.onresult = (event) => {
        let interim_transcript = '';
        let final_transcript = '';
        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
          } else {
            interim_transcript += event.results[i][0].transcript;
          }
        }
        console.log('final_transcript :', final_transcript);
        console.log('interim_transcript :', interim_transcript);
        this.zone.run(() => {
          observer.next({ final: final_transcript, interim: interim_transcript });
        });
      };

      // this.speechRecognition.onresult = speech => {
      //   let term: string = '';
      //   if (speech.results) {
      //     const result = speech.results[speech.resultIndex];
      //     const transcript = result[0].transcript;

      //     if (result.isFinal) {
      //       if (result[0].confidence < 0.3) {
      //         console.log('Unrecognized result - Please try again');
      //       } else {
      //         term = transcript;
      //       }
      //     }
      //   }
      //   this.zone.run(() => {
      //     observer.next(term);
      //   });
      // };

      this.speechRecognition.onerror = (error) => {
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

  capitalize = (s) => {
    let first_char = /\S/;
    return s.replace(first_char, function (m) {
      return m.toUpperCase();
    });
  };
}
