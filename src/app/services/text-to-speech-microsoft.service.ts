import {Injectable} from '@angular/core';
import {ErrorService} from './error.service';
import {SpeechConfig, SpeechSynthesizer} from 'microsoft-cognitiveservices-speech-sdk';
import {environment} from '../../environments/environment';
import {ERROR_TECH_TTS} from '../models/error/errorTechnical';
import {VOCABULARY_AZURE} from '../data/vocabulary-microsoft-azure';
import {TextToSpeechService} from './text-to-speech.service';


@Injectable({
  providedIn: 'root',
})
export class TextToSpeechMicrosoftService extends TextToSpeechService {

  constructor(private readonly errorService: ErrorService) {
    super();
  }

  getSpeech = async (text: string, language: string): Promise<void> => {
    this.audioSpeech = undefined;
    return new Promise((resolve) => {
      const speechConfig = SpeechConfig.fromSubscription(environment.microsoftSpeechConfig.key, environment.microsoftSpeechConfig.region);
      speechConfig.speechSynthesisLanguage = language;
      const synthesizer = new SpeechSynthesizer(speechConfig, null);

      const vacabulary = VOCABULARY_AZURE.find(value => value.isoCode === language);
      if (vacabulary && vacabulary.audioVoiceCode) {
        const speed = '-10.00%';
        const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${vacabulary.isoCode}"><voice name="${vacabulary.audioVoiceCode}"><prosody rate="${speed}">${text}</prosody></voice></speak>`;

        synthesizer.speakSsmlAsync(
          ssml,
          result => {
            synthesizer.close();
            if (result && result.audioData) {
              this.audioSpeech = new Audio(URL.createObjectURL(new Blob([result.audioData])));
              resolve();
            }
          },
          error => {
            console.log(error);
            synthesizer.close();
            this.errorService.save(ERROR_TECH_TTS);
            throw new Error(error);
            return false;
          });
      } else {
        synthesizer.speakTextAsync(
          text,
          result => {
            synthesizer.close();
            if (result && result.audioData) {
              this.audioSpeech = new Audio(URL.createObjectURL(new Blob([result.audioData])));
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
