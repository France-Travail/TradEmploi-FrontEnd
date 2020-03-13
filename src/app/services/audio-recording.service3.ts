import { Injectable } from '@angular/core';
import { SpeechToTextService } from './speechtoText.service';
import Flac from 'libflacjs/dist/libflac.js';

@Injectable({
  providedIn: 'root'
})
export class AudioRecordingService3 {
  private constraints = { audio: true };
  private flacEncoder: any;
  private sampleRate = 44100;
  private channels = 1;
  private compression = 5;
  private bps: Number = 16;
  private flacBuffers: Array<any> = [];
  private flacLength = 0;
  private stream = null;
  private input: MediaStreamAudioSourceNode;
  private node: ScriptProcessorNode;
  private audioOnBlob: Blob;

  public speechToText: string;
  public audioSpeech: HTMLAudioElement;
  public language: string;
  constructor() {}

  public start() {
    console.log('START');
    navigator.mediaDevices.getUserMedia(this.constraints).then(stream => {
      this.stream = stream;
      this.initFlac(stream);
    });
  }

  public stop() {
    console.log('STOP');
    var tracks = this.stream.getAudioTracks();
    for (var i = tracks.length - 1; i >= 0; --i) {
      tracks[i].stop();
    }
    Flac.FLAC__stream_encoder_finish(this.flacEncoder);
    const blob = this.exportFlacFile(this.flacBuffers, this.flacLength);
    const audioUrl = URL.createObjectURL(blob);
    this.audioSpeech = new Audio(audioUrl);
    Flac.FLAC__stream_encoder_delete(this.flacEncoder);
    this.clear();
    this.input.disconnect();
    this.node.disconnect();
    this.audioOnBlob = blob;
  }

  public async end(): Promise<string> {
    console.log('END');
    this.stop();
    if (this.audioOnBlob != undefined) {
      const audioOnBase64 = await this.convertBlobToBase64(this.audioOnBlob);
      const speechToTextService = new SpeechToTextService();
      return await speechToTextService.toText(audioOnBase64, this.language);
    }
  }

  private initFlac(stream) {
    const audioContext = new AudioContext();
    this.input = audioContext.createMediaStreamSource(stream);
    this.node = this.input.context.createScriptProcessor(4096, 1, 1);
    if (!Flac.isReady()) {
      Flac.onready = function() {
        setTimeout(function() {
          this.createFlac();
        }, 0);
      };
    } else {
      this.createFlac();
    }
    this.node.onaudioprocess = e => {
      var channelLeft = e.inputBuffer.getChannelData(0);
      this.doEncodeFlac(channelLeft);
    };
    this.input.connect(this.node);
    this.node.connect(audioContext.destination);
  }

  private createFlac() {
    this.flacEncoder = Flac.create_libflac_encoder(this.sampleRate, this.channels, this.bps, this.compression, 0);
    ////
    if (this.flacEncoder != 0) {
      let status_encoder: any = Flac.init_encoder_stream(this.flacEncoder, this.fillBufferOnFlac);
      //this.flac_ok &= (status_encoder == 0;)
    } else {
      console.error('Error initializing the encoder.');
    }
  }

  private fillBufferOnFlac = (buffer, bytes) => {
    this.flacBuffers.push(buffer);
    this.flacLength += buffer.byteLength;
  };

  private doEncodeFlac(audioData) {
    var buf_length = audioData.length;
    var buffer_i32 = new Uint32Array(buf_length);
    var view = new DataView(buffer_i32.buffer);
    var volume = 1;
    var index = 0;
    for (var i = 0; i < buf_length; i++) {
      view.setInt32(index, audioData[i] * (0x7fff * volume), true);
      index += 4;
    }

    var flac_return = Flac.FLAC__stream_encoder_process_interleaved(this.flacEncoder, buffer_i32, buffer_i32.length / this.channels);
    if (flac_return != true) {
      console.log('Error: encode_buffer_pcm_as_flac returned false. ' + flac_return);
    }
  }
  private exportFlacFile(recBuffers, recLength) {
    var samples = this.mergeBuffersUint8(recBuffers, recLength);
    var the_blob = new Blob([samples], { type: 'audio/flac' });
    return the_blob;
  }

  private mergeBuffersUint8(channelBuffer, recordingLength) {
    var result = new Uint8Array(recordingLength);
    var offset = 0;
    var lng = channelBuffer.length;
    for (var i = 0; i < lng; i++) {
      var buffer = channelBuffer[i];
      result.set(buffer, offset);
      offset += buffer.length;
    }
    return result;
  }

  private clear() {
    this.flacBuffers.splice(0, this.flacBuffers.length);
    this.flacLength = 0;
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
