import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpeechToTextService {
  public toText(audioBytes: any, codeLanguage: string): Observable<string> {
    const url: string = `https://speech.googleapis.com/v1/speech:recognize?key=${environment.gcp.apiKey}`;
    const config = {
      languageCode: codeLanguage,
      enableWordTimeOffsets: true,
      enableAutomaticPunctuation: true
    };
    const audio = {
      content: audioBytes
    };
    const request = {
      config,
      audio
    };
    return new Observable(observer => {
      axios
        .post(url, request)
        .then(response => {
          console.log('response :', response);
          const transcription = response.data.map(result => result.alternatives[0].transcript).join('\n');
          observer.next(transcription);
          observer.complete();
        })
        .catch(error => {
          observer.error('Traduction indisponible momentanément');
        });
    });
  }
}
