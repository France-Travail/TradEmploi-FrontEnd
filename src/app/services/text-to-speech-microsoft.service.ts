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

  public audioSpeech: HTMLAudioElement = undefined;

  constructor(private readonly errorService: ErrorService) {
    super();
  }

  getSpeech = async (text: string, language: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      this.audioSpeech = undefined;
      const speechConfig = SpeechConfig.fromSubscription(environment.microsoftSpeechConfig.key, environment.microsoftSpeechConfig.region);
      const vacabulary = VOCABULARY_AZURE.find(value => value.isoCode === language);

      if (vacabulary.audioVoiceCode) {
        const speed = '-10.00%';
        const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${vacabulary.isoCode}"><voice name="${vacabulary.audioVoiceCode}"><prosody rate="${speed}">${text}</prosody></voice></speak>`;
        const synthesizer = new SpeechSynthesizer(speechConfig);

        synthesizer.speakSsmlAsync(
          ssml,
          result => {
            synthesizer.close();
            if (result) {
              // return result as stream
              this.audioSpeech = new Audio('data:audio/mp3;base64,' + result.audioData);
            }
          },
          error => {
            console.log(error);
            synthesizer.close();
            this.errorService.save(ERROR_TECH_TTS);
            throw new Error(error);
          });
      } else {
        speechConfig.speechSynthesisLanguage = language;
        const synthesizer = new SpeechSynthesizer(speechConfig);
        synthesizer.speakTextAsync(
          text,
          result => {
            synthesizer.close();
            if (result) {
              // return result as stream
              this.audioSpeech = new Audio('data:audio/mp3;base64,' + result.audioData);
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

  private callbackReject(error: string, synthesizer: SpeechSynthesizer, reject: (reason?: any) => void) {
    synthesizer.close();
    this.errorService.save(ERROR_TECH_TTS);
    throw new Error(error);
    reject();
  }

  private callbackResolve(synthesizer: SpeechSynthesizer, resolve: (value?: (PromiseLike<unknown> | unknown)) => void) {
    return result => {
      if (result) {
        this.audioSpeech = this.createAudio(result.audioData);
        resolve();
      }
    };
  }

  private createAudio(data): HTMLAudioElement {
    const blob = new Blob([data], {type: 'audio/wav'});
    const url = window.URL.createObjectURL(blob);
    return new Audio(url);
  }

}
