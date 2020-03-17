/// <reference lib="webworker" />
import Flac from 'libflacjs/dist/libflac.js';

let flacBuffers = [];
let flacLength = 0;
let flacEncoder;
let channels = 1;

addEventListener('message', ({ data }) => {
  if (data.type === 'init') {
    initFlac();
  } else if (data.type === 'encode') {
    doEncodeFlac(data.buf);
  } else if (data.type === 'finish') {
    const blob = finish();
    postMessage({ type: 'end', blob: blob });
  } else {
    postMessage(`worker response to ${data.type}: task not found`);
  }
});

function initFlac() {
  if (!Flac.isReady()) {
    Flac.onready = function() {
      setTimeout(function() {
        createFlac();
      }, 0);
    };
  } else {
    createFlac();
  }
}

function createFlac() {
  const sampleRate = 44100;
  const channels = 1;
  const compression = 5;
  const bps: Number = 16;
  flacEncoder = Flac.create_libflac_encoder(sampleRate, channels, bps, compression, 0);
  if (flacEncoder != 0) {
    Flac.init_encoder_stream(flacEncoder, fillBufferOnFlac);
  } else {
    console.error('Error initializing the encoder.');
  }
}

function fillBufferOnFlac(buffer, bytes) {
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
  var buf_length = audioData.length;
  var buffer_i32 = new Uint32Array(buf_length);
  var view = new DataView(buffer_i32.buffer);
  var volume = 1;
  var index = 0;
  for (var i = 0; i < buf_length; i++) {
    view.setInt32(index, audioData[i] * (0x7fff * volume), true);
    index += 4;
  }

  var flac_return = Flac.FLAC__stream_encoder_process_interleaved(flacEncoder, buffer_i32, buffer_i32.length / channels);
  if (flac_return != true) {
    console.log('Error: encode_buffer_pcm_as_flac returned false. ' + flac_return);
  }
}

const exportFlacFile = (recBuffers, recLength) => {
  var samples = mergeBuffersUint8(recBuffers, recLength);
  var the_blob = new Blob([samples], { type: 'audio/flac' });
  return the_blob;
};

const mergeBuffersUint8 = (channelBuffer, recordingLength) => {
  var result = new Uint8Array(recordingLength);
  var offset = 0;
  var lng = channelBuffer.length;
  for (var i = 0; i < lng; i++) {
    var buffer = channelBuffer[i];
    result.set(buffer, offset);
    offset += buffer.length;
  }
  return result;
};