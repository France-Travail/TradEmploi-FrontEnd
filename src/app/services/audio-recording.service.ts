import { Injectable } from '@angular/core';
import { SpeechToTextService } from './speechtoText.service';
import Flac from 'libflacjs/dist/libflac.js';

@Injectable({
  providedIn: 'root'
})
export class AudioRecordingService {
  public audio: any;
  private audioOnBlob: Blob;
  private flac_encoder: any;

  private SAMPLERATE = 44100;
  private CHANNELS = 1;
  private COMPRESSION = 5;
  private bps: Number = 16;
  private flac_ok: Number = 1;
  private INIT: Boolean = false;
  private flacBuffers: Array<any> = [];
  private flacLength = 0;
  private recording: boolean = false;
  private stream = null;
  private speechToText = '';

  constructor() {}

  recordAudio = (): Promise<any> => {
    return new Promise(resolve => {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        this.stream = stream;
        const audio_context = new AudioContext();
        const input = audio_context.createMediaStreamSource(stream);
        const node = input.context.createScriptProcessor(4096, 1, 1);
        // const sampleRate = audio_context.sampleRate;

        if (!Flac.isReady()) {
          Flac.onready = function() {
            setTimeout(function() {
              this.initFlac();
            }, 0);
          };
        } else {
          this.initFlac();
        }

        node.onaudioprocess = e => {
          var channelLeft = e.inputBuffer.getChannelData(0);
          this.doEncodeFlac(channelLeft);
        };

        input.connect(node);
        node.connect(audio_context.destination);
        ///
        // const mediaRecorder = new MediaRecorder(stream);
        // const audioChunks = [];

        // mediaRecorder.addEventListener('dataavailable', event => {
        //   audioChunks.push(event.data);
        // });

        const start = () => {
          // mediaRecorder.start();
          this.recording = true;
        };

        const stop = () => {
          console.log("STOP");
          return new Promise(resolve => {
            var tracks = this.stream.getAudioTracks();
            for (var i = tracks.length - 1; i >= 0; --i) {
              tracks[i].stop();
            }
            this.recording = false;
            Flac.FLAC__stream_encoder_finish(this.flac_encoder);
            const data = this.exportFlacFile(this.flacBuffers, this.flacLength);
            const audioUrl = URL.createObjectURL(data);
            const audio = new Audio(audioUrl);
            this.audio = audio;
            const play = () => {
              audio.play();
            };
            Flac.FLAC__stream_encoder_delete(this.flac_encoder);
            input.disconnect();
            node.disconnect();

            if (data != undefined) {
              this.audioOnBlob = data;
              return this.convertBlobToBase64(data).then(audioOnBase64 => {
                const speechToTextService = new SpeechToTextService();
                return speechToTextService.toText(audioOnBase64, 'fr-FR').then(res => {
                  console.log('res :', res);
                  this.speechToText = res;
                  resolve({res,play});
                  return res;
                });
              });
              //resolve({ result, play });
            }

            // const speechToTextService = new SpeechToTextService();
            // speechToTextService.toText(data, 'fr-FR').then(res => {
            //   console.log('res :', res);
            // });
            // mediaRecorder.addEventListener('stop', () => {
            //   const audioBlob = new Blob(audioChunks);
            //   this.audioOnBlob = audioBlob;
            //   console.log('this.audioOnBlob :', this.audioOnBlob);
            //   const audioUrl = URL.createObjectURL(audioBlob);
            //   const audio = new Audio(audioUrl);
            //   this.audio = audio;
            //   const play = () => {
            //     audio.play();
            //   };
            //   resolve({ audioBlob, audioUrl, play });
            // });
            // mediaRecorder.stop();
          });
        };

        resolve({ start, stop });
      });
    });
  };

  public toText = async (): Promise<string> => {
    if (this.audioOnBlob != undefined) {
      const audioOnBase64 = await this.convertBlobToBase64(this.audioOnBlob);
      const speechToTextService = new SpeechToTextService();
      const res = await speechToTextService.toText(audioOnBase64, 'fr-FR');
      return res;
    }
  };

  // private convertBlobToBase64 = (blob: Blob): Promise<any> => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(blob);
  //     reader.onloadend = () => {
  //       const readerResult = reader.result as string;
  //       const audioData = readerResult.replace(/^data:audio\/flac;base64,/, '');
  //       resolve(audioData);
  //     };
  //   });
  // };

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
  initFlac() {
    this.flac_encoder = Flac.create_libflac_encoder(this.SAMPLERATE, this.CHANNELS, this.bps, this.COMPRESSION, 0);
    ////
    if (this.flac_encoder != 0) {
      let status_encoder: any = Flac.init_encoder_stream(this.flac_encoder, this.fillBufferOnFlac);
      //this.flac_ok &= (status_encoder == 0;)

      this.INIT = true;
    } else {
      console.error('Error initializing the encoder.');
    }
  }

  doEncodeFlac(audioData) {
    var buf_length = audioData.length;
    var buffer_i32 = new Uint32Array(buf_length);
    var view = new DataView(buffer_i32.buffer);
    var volume = 1;
    var index = 0;
    for (var i = 0; i < buf_length; i++) {
      view.setInt32(index, audioData[i] * (0x7fff * volume), true);
      index += 4;
    }

    var flac_return = Flac.FLAC__stream_encoder_process_interleaved(this.flac_encoder, buffer_i32, buffer_i32.length / this.CHANNELS);
    if (flac_return != true) {
      console.log('Error: encode_buffer_pcm_as_flac returned false. ' + flac_return);
    }
  }

  // finish = () => {
  //   Flac.FLAC__stream_encoder_finish(this.flac_encoder);
  //   const data = this.exportFlacFile(this.flacBuffers, this.flacLength);

  //   Flac.FLAC__stream_encoder_delete(this.flac_encoder);
  //   return data;
  // };
  private fillBufferOnFlac = (buffer, bytes) => {
    this.flacBuffers.push(buffer);
    this.flacLength += buffer.byteLength;
  };

  mergeBuffersUint8(channelBuffer, recordingLength) {
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
  exportFlacFile(recBuffers, recLength) {
    //convert buffers into one single buffer
    var samples = this.mergeBuffersUint8(recBuffers, recLength);

    //	var audioBlob = new Blob([samples], { type: type });
    var the_blob = new Blob([samples], { type: 'audio/flac' });
    return the_blob;
  }

  clear() {
    console.log('clear');
    this.flacBuffers.splice(0, this.flacBuffers.length);
    this.flacLength = 0;
  }
}
