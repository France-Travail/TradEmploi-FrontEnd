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
        data: data
      })
        .then(operation => {
          const urlOperation: string = `https://speech.googleapis.com/v1/operations/${operation.data.name}?key=${environment.gcp.apiKey}`;
          let wait = this.getWaitTime(time);
          setTimeout(function() {
            axios({
              method: 'get',
              headers: { 'content-type': 'application/json; charset=utf-8' },
              url: urlOperation
            }).then(res => {
              const transcription =
                res.data.response === undefined || res.data.response.results === undefined ? '' : res.data.response.results[0].alternatives[0].transcript;
              observer.next(transcription);
              observer.complete();
            });
          }, wait);
        })
        .catch(error => {
          observer.error('Enregistrement indisponible momentanément');
        });
    });
  };

  private getWaitTime = (time: number): number => {
    let speakTimeInSecond = time / 10;
    return (speakTimeInSecond/4) * 1000;
  };
}
