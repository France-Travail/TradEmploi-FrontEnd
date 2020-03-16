import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeechToTextSyncService {
  toText = (audioBytes: any, language: string): Observable<string> => {
    const urlRecognize: string = `https://speech.googleapis.com/v1/speech:recognize?key=${environment.gcp.apiKey}`;
    const data = {
      config: {
        encoding: 'FLAC',
        sampleRateHertz: 44100,
        languageCode: language
      },
      audio: {
        content: audioBytes
      }
    };
    return new Observable(observer => {
      axios({
        method: 'post',
        url: urlRecognize,
        data: data
      })
        .then(response => {
          const transcription = response.data.results[0].alternatives[0].transcript;
          observer.next(transcription);
          observer.complete();
        })
        .catch(error => {
          observer.error('Enregistrement indisponible momentanément');
        });
    });
  };
}
