import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeechToTextService {

  recognizeAsync = (audioBytes: any, language: string, time: number): Observable<string> => {
    const urlRecognize: string = `https://speech.googleapis.com/v1/speech:longrunningrecognize?key=${environment.gcp.apiKey}`;
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
        headers: { 'content-type': 'application/json; charset=utf-8' },
        url: urlRecognize,
        data
      })
        .then(operation => {
          const urlOperation: string = `https://speech.googleapis.com/v1/operations/${operation.data.name}?key=${environment.gcp.apiKey}`;
          const wait = this.getWaitTime(time);
          setTimeout(() => {
            axios({
              method: 'get',
              headers: { 'content-type': 'application/json; charset=utf-8' },
              url: urlOperation
            }).then(res => {
              const transcription =
                res.data.response === undefined || res.data.response.results === undefined ? '' : res.data.response.results.map(result => result.alternatives[0].transcript).join('');
              observer.next(transcription);
              observer.complete();
            }).catch(error => {
              observer.error('Enregistrement indisponible momentanément');
              throw new Error('An error occurred when api speech to text get operation called');
            });
          }, wait);
        })
        .catch(error => {
          observer.error('Enregistrement indisponible momentanément');
          throw new Error('An error occurred when api async speech to text longrunningrecognize called');
        });
    });
  }

  private getWaitTime = (time: number): number => {
    return (time / 2) * 1000;
  }
}
