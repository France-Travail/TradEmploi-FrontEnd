import {Injectable} from '@angular/core';
import axios from 'axios';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TokenAzureService {
  private tokenKey = 'TOKEN_AZURE';
  private delayToken = 540000; // 9 minutes

  public async getToken(): Promise<string> {

    const tokenFromLocalStorage = this.getTokenWithExpiry(this.tokenKey);
    if (tokenFromLocalStorage) {
      return tokenFromLocalStorage;
    } else {
      const tokenApi = await this.refreshToken();
      this.setTokenWithExpiry(this.tokenKey, tokenApi, this.delayToken);
      return tokenApi;
    }

  }


  private refreshToken = async (): Promise<string> => {
    return new Promise((resolve) => {
      return axios.post(
        `https://${environment.microsoftSpeechConfig.region}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
        undefined,
        {
          headers: {
            'Ocp-Apim-Subscription-Key': `${environment.microsoftSpeechConfig.key}`,
            'content-type': 'application/x-www-form-urlencoded'
          },
        }).then((response) => {
        resolve(response.data);
      }).catch(function(error) {
        console.error(error);
      });
    });
  }

  private setTokenWithExpiry(key: string, value: string, delayToken: number) {
    const now = new Date();
    const item = {
      value,
      expiry: now.getTime() + delayToken,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  private getTokenWithExpiry(key: string): string {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }
}
