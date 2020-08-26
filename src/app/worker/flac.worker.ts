/// <reference lib="webworker" />
import Flac from 'libflacjs/dist/libflac.js';

const flacBuffers = [];
let flacLength = 0;
let flacEncoder;
const channels = 1;

addEventListener('message', ({ data }) => {
  if (data.type === 'init') {
    initFlac();
  } else if (data.type === 'encode') {
    doEncodeFlac(data.buf);
  } else if (data.type === 'finish') {
    const blob = finish();
    postMessage({ type: 'end', blob });
  } else {
    postMessage(`worker response to ${data.type}: task not found`);
  }
});

function initFlac() {
  if (!Flac.isReady()) {
    Flac.onready = () => {
      setTimeout(() => {
        createFlac();
      }, 0);
    };
  } else {
    createFlac();
  }
}

function createFlac() {
  const sampleRate = 44100;
  // const channels = 1;
  const compression = 5;
  const bps: number = 16;
  flacEncoder = Flac.create_libflac_encoder(sampleRate, 1, bps, compression, 0);
  if (flacEncoder !== 0) {
    Flac.init_encoder_stream(flacEncoder, fillBufferOnFlac);
  } else {
    console.error('Error initializing the encoder.');
  }
}

function fillBufferOnFlac(buffer) {
  flacBuffers.push(buffer);
  flacLength += buffer.byteLength;
}

function finish() {
  Flac.FLAC__stream_encoder_finish(flacEncoder);
  const blob = exportFlacFile(flacBuffers, flacLength);
  Flac.FLAC__stream_encoder_delete(flacEncoder);
  clear();
  return blob;
}

function clear() {
  flacBuffers.splice(0, flacBuffers.length);
  flacLength = 0;
}

function doEncodeFlac(audioData) {
  const bufLength = audioData.length;
  const bufferI32 = new Uint32Array(bufLength);
  const view = new DataView(bufferI32.buffer);
  const volume = 1;
  let index = 0;
  for (let i = 0; i < bufLength; i++) {
    view.setInt32(index, audioData[i] * (0x7fff * volume), true);
    index += 4;
  }

  const flacReturn = Flac.FLAC__stream_encoder_process_interleaved(flacEncoder, bufferI32, bufferI32.length / channels);
  // if (flacReturn !== true) {
  //   console.log('Error: encode_buffer_pcm_as_flac returned false. ' + flacReturn);
  // }
}

function exportFlacFile(recBuffers, recLength) {
  const samples = mergeBuffersUint8(recBuffers, recLength);
  const theBlob = new Blob([samples], { type: 'audio/flac' });
  return theBlob;
}

function mergeBuffersUint8(channelBuffer, recordingLength) {
  const result = new Uint8Array(recordingLength);
  let offset = 0;
  const lng = channelBuffer.length;
  for (let i = 0; i < lng; i++) {
    const buffer = channelBuffer[i];
    result.set(buffer, offset);
    offset += buffer.length;
  }
  return result;
}
