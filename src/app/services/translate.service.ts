import {Injectable} from '@angular/core';
import axios from 'axios';
import {ErrorService} from './error.service';
import {ERROR_TECH_TRANSLATION} from '../models/error/errorTechnical';
import {TokenResponse} from '../models/token/tokensResponse';
import {TokenBrokerService} from './token-broker.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  constructor(private errorService: ErrorService, private tbs: TokenBrokerService) {}

  public async translate(text: string, targetLanguageCode: string): Promise<string> {
    targetLanguageCode = this.mapLanguage(targetLanguageCode);
    const tokenResponse: TokenResponse = await this.tbs.getTokenGcp();
    const gwToken = tokenResponse.tokenGW;
    const url = `${environment.gcp.gateWayUrl}/translation`;
    const data = {
      text,
      sourceLanguageCode: 'fr-FR',
      targetLanguageCode,
      projectId: environment.firebaseConfig.projectId
    };
    return axios({
      method: 'POST',
      headers: {Authorization: `Bearer ${gwToken}`, 'content-type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*'},
      data,
      url,
    }).then((response) => {
          return response.data.translatedText;
    }).catch((error) => {
      throw new Error(error);
    });
  }

  private mapLanguage(targetLanguageCode: string) {
    if (targetLanguageCode === 'ar-XA') {
      targetLanguageCode = 'ar-EG';
    }
    return targetLanguageCode;
  }
}
