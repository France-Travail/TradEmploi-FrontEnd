import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpeechToTextSyncService {
  recognizeSync = (audioBytes: any, language: string, time: number): Observable<string> => {
    const urlRecognize: string = `https://speech.googleapis.com/v1/speech:recognize?key=${environment.gcp.apiKey}`;
    const data = {
      config: {
        encoding: 'FLAC',
        sampleRateHertz: 44100,
        languageCode: language,
      },
      audio: {
        content: audioBytes,
      },
    };
    return new Observable((observer) => {
      axios({
        method: 'post',
        headers: { 'content-type': 'application/json; charset=utf-8' },
        url: urlRecognize,
        timeout: 60000,
        data,
      })
        .then((response) => {
          const transcription = response.data.results[0].alternatives[0].transcript;
          observer.next(transcription);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
          throw new Error('An error occurred when api async speech to text longrunningrecognize called');
        });
    });
  };
}
