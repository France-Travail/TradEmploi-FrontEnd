import {Injectable} from '@angular/core';
import {ErrorService} from './error.service';
import {SpeechConfig, SpeechSynthesizer} from 'microsoft-cognitiveservices-speech-sdk';
import {environment} from '../../environments/environment';
import {ERROR_TECH_TTS} from '../models/error/errorTechnical';
import {VOCABULARY} from '../data/vocabulary';
import {TextToSpeechService} from './text-to-speech.service';
import {TokenAzureService} from './token-azure.service';


@Injectable({
  providedIn: 'root',
})
export class TextToSpeechMicrosoftService extends TextToSpeechService {

  constructor(private readonly errorService: ErrorService, private tokenAzureService: TokenAzureService) {
    super();
  }

  getSpeech = async (text: string, language: string, isFemaleSpeech: boolean): Promise<void> => {
    this.audioSpeech = undefined;
    const authorizationToken = await this.tokenAzureService.getToken();
    const speechConfig = SpeechConfig.fromAuthorizationToken(authorizationToken, environment.microsoftSpeechConfig.region);

    return new Promise((resolve) => {
      speechConfig.speechSynthesisLanguage = language;
      const synthesizer = new SpeechSynthesizer(speechConfig, null);

      const vacabulary = VOCABULARY.find(value => value.isoCode === language);
      if (vacabulary && vacabulary.audioVoiceCodeMale && vacabulary.audioVoiceCodeFemale) {
        const speed = '-10.00%';
        const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${vacabulary.isoCode}"><voice name="${vacabulary.audioVoiceCodeMale && vacabulary.audioVoiceCodeFemale}"><prosody rate="${speed}">${text}</prosody></voice></speak>`;

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
