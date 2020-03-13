import { Injectable } from '@angular/core';
import { SpeechToTextService } from './speechtoText.service';
import { TASK } from './audio-recording.worker';

@Injectable({
  providedIn: 'root'
})
export class AudioRecordingService {
  public audioSpeech: HTMLAudioElement;
  public language: string;

  private constraints = { audio: true };
  private stream = null;
  private input: MediaStreamAudioSourceNode;
  private node: ScriptProcessorNode;
  private audioOnBlob: Blob;
  private worker: Worker;

  constructor() {
    this.worker = new Worker('./audio-recording.worker', { type: 'module' });
  }

  public start() {
    navigator.mediaDevices.getUserMedia(this.constraints).then(stream => {
      this.stream = stream;
      const audioContext = new AudioContext();
      this.input = audioContext.createMediaStreamSource(stream);
      this.node = this.input.context.createScriptProcessor(4096, 1, 1);
      this.worker.postMessage({ type: TASK.INIT });
      this.node.onaudioprocess = e => {
        var channelLeft = e.inputBuffer.getChannelData(0);
        this.worker.postMessage({ type: TASK.ENCODE, buf: channelLeft });
      };
      this.input.connect(this.node);
      this.node.connect(audioContext.destination);
      this.worker.onmessage = ({ data }) => {
        console.log(`page got message AUDIO: ${data.message}`);
      };
    });
  }

  public stop() {
    console.log('STOP');
    var tracks = this.stream.getAudioTracks();
    for (var i = tracks.length - 1; i >= 0; --i) {
      tracks[i].stop();
    }
    this.worker.postMessage({ type: TASK.FINISH });
    this.worker.onmessage = async ({ data }) => {
      if (data.type === TASK.END) {
        this.audioOnBlob = data.blob;
        const audioUrl = URL.createObjectURL(this.audioOnBlob);
        this.audioSpeech  = new Audio(audioUrl);
      }
    };
    this.input.disconnect();
    this.node.disconnect();
    this.input = null;
    this.node = null;
  }

  public async end(): Promise<string> {
    this.stop();
    console.log('END');
    if (this.audioOnBlob != undefined) {
      const audioOnBase64 = await this.convertBlobToBase64(this.audioOnBlob);
      const speechToTextService = new SpeechToTextService();
      return await speechToTextService.toText(audioOnBase64, this.language);
    }
    return;
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
