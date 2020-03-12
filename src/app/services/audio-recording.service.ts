import { Injectable } from '@angular/core';
import { SpeechToTextService } from './speechtoText.service';

@Injectable({
  providedIn: 'root'
})
export class AudioRecordingService {
  public audio: any;
  private audioOnBlob: Blob;
  constructor() {}

  recordAudio = (): Promise<any> => {
    return new Promise(resolve => {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks = [];

        mediaRecorder.addEventListener('dataavailable', event => {
          audioChunks.push(event.data);
        });

        const start = () => {
          mediaRecorder.start();
        };

        const stop = () => {
          return new Promise(resolve => {
            mediaRecorder.addEventListener('stop', () => {
              const audioBlob = new Blob(audioChunks);
              this.audioOnBlob = audioBlob;
              console.log('this.audioOnBlob :', this.audioOnBlob);
              const audioUrl = URL.createObjectURL(audioBlob);
              const audio = new Audio(audioUrl);
              this.audio = audio;
              const play = () => {
                audio.play();
              };

              resolve({ audioBlob, audioUrl, play });
            });

            mediaRecorder.stop();
          });
        };

        resolve({ start, stop });
      });
    });
  };

  public toText = () => {
    if (this.audioOnBlob != undefined) {
      this.convertBlobToBase64(this.audioOnBlob).then(audioOnBase64 => {
        const speechToTextService = new SpeechToTextService();
        speechToTextService.toText(audioOnBase64, 'fr-FR').then(res => {
          console.log('res :', res);
        });
      });
    }
  };

  private convertBlobToBase64 = (blob: Blob): Promise<any> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const readerResult = reader.result as string;
        const audioData = readerResult.replace(/^data:audio\/flac;base64,/, '');
        resolve(audioData);
      };
    });
  };
}
