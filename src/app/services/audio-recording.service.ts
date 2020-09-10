import { Injectable } from '@angular/core';
import { SpeechToTextSyncService } from './speech-to-text-sync.service';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AudioRecordingService {
  public audioSpeech: HTMLAudioElement;
  public speechToText: Subject<string> = new Subject<string>();
  public language: string;

  private constraints = { audio: true };
  private stream = null;
  private input: MediaStreamAudioSourceNode;
  private node: ScriptProcessorNode;
  private audioOnBlob: Blob;
  private worker: Worker;

  constructor() {
    this.worker = new Worker('../worker/flac.worker', { type: 'module' });
  }

  public start() {
    navigator.mediaDevices.getUserMedia(this.constraints).then((stream) => {
      this.stream = stream;
      const audioContext = new AudioContext();
      this.input = audioContext.createMediaStreamSource(stream);
      this.node = this.input.context.createScriptProcessor(4096, 1, 1);
      this.worker.postMessage({ type: 'init' });
      this.node.onaudioprocess = (e) => {
        const channelLeft = e.inputBuffer.getChannelData(0);
        this.worker.postMessage({ type: 'encode', buf: channelLeft });
      };
      this.input.connect(this.node);
      this.node.connect(audioContext.destination);
    });
  }

  public stop(time: number) {
    const tracks = this.stream.getAudioTracks();
    for (let i = tracks.length - 1; i >= 0; --i) {
      tracks[i].stop();
    }
    setTimeout((_) => this.worker.postMessage({ type: 'finish' }), 100);
    this.worker.onmessage = async ({ data }) => {
      if (data.type === 'end') {
        this.audioOnBlob = data.blob;
        const audioUrl = URL.createObjectURL(this.audioOnBlob);
        this.audioSpeech = new Audio(audioUrl);
        if (this.audioOnBlob !== undefined) {
          const audioOnBase64 = await this.convertBlobToBase64(this.audioOnBlob);
          const speechToTextService = new SpeechToTextSyncService();
          speechToTextService.recognizeSync(audioOnBase64, this.language, time).subscribe(
            (resultat) => this.speechToText.next(resultat),
            (error) => this.speechToText.error(error)
          );
        }
      }
    };
    this.input.disconnect();
    this.node.disconnect();
    this.input = null;
    this.node = null;
  }

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
