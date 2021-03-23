import { Injectable } from '@angular/core';
import axios from 'axios';
import { ErrorService } from './error.service';
import { ERROR_TECH_TRANSLATION } from '../models/error/errorTechnical';

import { JwtFbSingleton } from '../models/token/JwtFbSingleton';
import { SettingsService } from './settings.service';
import { Role } from '../models/role';
import { TokenBrokerService } from './token-broker.service';

import { TokenResponse } from '../models/token/tokensResponse';
@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  constructor(private errorService: ErrorService, private settingsService: SettingsService, private tbs: TokenBrokerService) {}

  public async translate(text: string, lang: string): Promise<string> {
    // add role handler.
    const tokenResponse: TokenResponse = await this.tbs.getTokenAdmin(JwtFbSingleton.getInstance().getToken().token);
    const url = `https://translation.googleapis.com/language/translate/v2`;
    const data = {
      q: text,
      target: lang.split('-')[0],
      format: 'text',
    };
    return axios({
      method: 'post',
      headers: { Authorization: `Bearer ${tokenResponse.tokenGCP}`, 'content-type': 'application/json; charset=utf-8' },
      data,
      url,
    })
      .then((response) => {
        if (response.data.data.translatation !== undefined || response.data.data.translatation !== null) {
          return response.data.data.translations[0].translatedText;
        }
      })
      .catch((error) => {
        this.errorService.save(ERROR_TECH_TRANSLATION);
        throw new Error(error);
      });
  }
}
