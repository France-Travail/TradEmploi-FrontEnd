import { Injectable } from '@angular/core';
import axios from 'axios';
import { ErrorService } from './error.service';
import { TokenResponse } from '../models/token/tokensResponse';
import { TokenBrokerService } from './token-broker.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  constructor(private readonly errorService: ErrorService, private readonly tbs: TokenBrokerService) {}

  public async translate(text: string, targetLanguageCode: string, sourceLanguageCode?: string): Promise<string> {
    targetLanguageCode = this.mapLanguage(targetLanguageCode);
    const tokenResponse: TokenResponse = await this.tbs.getTokenGcp();
    const gwToken = tokenResponse.tokenGW;
    const url = `${environment.gcp.gateWayUrl}/translation`;
    const data = {
      text,
      sourceLanguageCode: sourceLanguageCode ? sourceLanguageCode : 'fr-FR',
      targetLanguageCode,
      projectId: environment.firebaseConfig.projectId,
    };

    return axios({
      method: 'POST',
      headers: { Authorization: `Bearer ${gwToken}`, 'content-type': 'application/json; charset=utf-8' },
      data,
      url,
    })
      .then((response) => {
        return response.data.translatedText;
      })
      .catch((error) => {
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
