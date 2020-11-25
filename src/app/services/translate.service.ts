import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';
import { ERROR_TECH_TRANSLATION } from '../models/error/errorTechnical';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {

  constructor(private errorService: ErrorService) {}

  public translate(text: string, lang: string): Promise<string> {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${environment.gcp.apiKey}`
    const data = {
      q: text,
      target: lang.split('-')[0],
      format: 'text',
    };
    return axios({
        method: 'post',
        headers: { 'content-type': 'application/json; charset=utf-8' },
        data,
        url
      })
        .then((response) => {
          if (response.data.data.translatation !== undefined || response.data.data.translatation !== null) {
            return response.data.data.translations[0].translatedText;
          }
        })
        .catch(error => {
          this.errorService.save(ERROR_TECH_TRANSLATION);
          throw new Error(error);
        });
  }
}
