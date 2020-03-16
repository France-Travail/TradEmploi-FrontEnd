import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeechToTextService {
  toText = (audioBytes: any, language: string, time: number): Observable<string> => {
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
        url: urlRecognize,
        data: data
      })
        .then(response => {
          const url: string = `https://speech.googleapis.com/v1/operations/${response.data.name}?key=${environment.gcp.apiKey}`;
          let speakTimeInSecond = time / 10;
          let minimalTimeOnMS = speakTimeInSecond/2 * 1000
          setTimeout(function() {
            axios({
              method: 'get',
              headers: { 'content-type': 'application/json; charset=utf-8' },
              url: url
            }).then(res => {
              const transcription = res.data.response.results[0].alternatives[0].transcript;
              observer.next(transcription);
              observer.complete();
            });
          }, minimalTimeOnMS);
        })
        .catch(error => {
          observer.error('Enregistrement indisponible momentanément');
        });
    });
  };
}
