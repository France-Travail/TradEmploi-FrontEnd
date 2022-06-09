import {Injectable} from '@angular/core';
import {ErrorService} from './error.service';
import {AudioConfig, AudioOutputStream, SpeechConfig, SpeechSynthesizer} from 'microsoft-cognitiveservices-speech-sdk';
import {environment} from '../../environments/environment';
import {ERROR_TECH_TTS} from '../models/error/errorTechnical';
import {VOCABULARY_AZURE} from '../data/vocabulary-microsoft-azure';
import {TextToSpeechService} from './text-to-speech.service';
import {
  SpeechSynthesisOutputFormat
} from 'microsoft-cognitiveservices-speech-sdk/distrib/lib/src/sdk/SpeechSynthesisOutputFormat';


@Injectable({
  providedIn: 'root',
})
export class TextToSpeechMicrosoftService extends TextToSpeechService {

  constructor(private readonly errorService: ErrorService) {
    super();
  }

  getSpeech = async (text: string, language: string): Promise<void> => {

    return new Promise((resolve) => {
      this.audioSpeech = undefined;
      const speechConfig = SpeechConfig.fromSubscription(environment.microsoftSpeechConfig.key, environment.microsoftSpeechConfig.region);
      const vacabulary = VOCABULARY_AZURE.find(value => value.isoCode === language);

      if (vacabulary.audioVoiceCode) {
        const speed = '-10.00%';
        const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${vacabulary.isoCode}"><voice name="${vacabulary.audioVoiceCode}"><prosody rate="${speed}">${text}</prosody></voice></speak>`;
        const audioFile = AudioOutputStream.createPullStream();
        const audioConfig = AudioConfig.fromStreamOutput(audioFile);
        let synthesizer = new SpeechSynthesizer(speechConfig, audioConfig);
        speechConfig.speechSynthesisOutputFormat = SpeechSynthesisOutputFormat.Audio24Khz48KBitRateMonoMp3;

        synthesizer.speakSsmlAsync(
          ssml,
          result => {
            synthesizer.close();
            if (result) {
              this.audioSpeech = new Audio('data:audio/mp3;base64,');
              this.audioSpeech.src = URL.createObjectURL(new Blob([result.audioData]));
              resolve();
            }
          },
          error => {
            console.log(error);
            synthesizer.close();
            synthesizer = undefined;
            this.errorService.save(ERROR_TECH_TTS);
            throw new Error(error);
            return false;
          });
      } else {
        speechConfig.speechSynthesisLanguage = language;
        const synthesizer = new SpeechSynthesizer(speechConfig);
        synthesizer.speakTextAsync(
          text,
          result => {
            synthesizer.close();
            if (result) {
              this.audioSpeech = new Audio('data:audio/mp3;base64,');
              this.audioSpeech.src = URL.createObjectURL(new Blob([result.audioData]));
              resolve();
            }
          },
          error => {
            console.log(error);
            synthesizer.close();
            this.errorService.save(ERROR_TECH_TTS);
            throw new Error(error);
          });
      }

    });
  }

}
