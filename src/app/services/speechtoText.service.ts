import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { Buffer } from 'buffer';
@Injectable({
  providedIn: 'root'
})
export class SpeechToTextService {
  toText = (audioBytes: any, language: string): Promise<string> => {
    const url: string = `https://speech.googleapis.com/v1/speech:recognize?key=${environment.gcp.apiKey}`;
    //const audioBinary = this.b64ToBinary(audioBytes);
    const data = {
      config: {
        encoding: 'FLAC',
        sampleRateHertz: 44100,
        languageCode: language,
        maxAlternatives: 20
      },
      audio: {
        content: audioBytes
      }
    };
    console.log('body :', data);
    return axios({
      method: 'post',
      url: url,
      data: data
    })
      .then(response => {
        console.log('response :', response.data);
        const transcription = response.data.map(result => result.alternatives[0].transcript).join('\n');
        return transcription;
      })
      .catch(error => {
        console.log('error response:', error.response);
        return 'Traduction indisponible momentanément';
      });
  };
  b64ToBinary(b64) {
    return Buffer.from(b64, 'base64');
  }
}
