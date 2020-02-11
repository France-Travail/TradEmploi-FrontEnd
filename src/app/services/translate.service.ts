// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Models
import { Lang } from '../models/lang';

interface TranslateResult {
  data: {
    translations: { translatedText: string }[];
  };
}

interface TranslateResult {
  detectedSourceLanguage: string;
  translatedText: string;
}

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  public guest: Lang = { audioLanguage: '', writtenLanguage: '' };
  public advisor: string = 'fr-FR';
  private url: string = 'https://translate-pe.firebaseapp.com/api/v1';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {}

  /**
   * Remove the guest language
   */
  public resetGuestLanguage(): void {
    this.guest = { audioLanguage: '', writtenLanguage: '' };
  }

  public sendTextToTranslation(data: string, speaker: string): Observable<TranslateResult[]> {
    const url = `${this.url}/text_to_translate`;

    const body: any = {
      language_in: speaker === 'advisor' ? this.advisor.split('-')[0] : this.guest.writtenLanguage.split('-')[0],
      language_out: speaker === 'advisor' ? this.guest.writtenLanguage.split('-')[0] : this.advisor.split('-')[0],
      text: data
    };

    return this.httpClient.post<TranslateResult[]>(url, body, this.httpOptions);
  }

  /**
   * Call Cloud Function to translate an audio
   * !!!! NOT USE FOR NOW !!!!
   */
  public async sendAudioToTranslation (data: Blob, speaker: string): Promise<any> {
    const url = `${this.url}/speech_to_translate`;

    const audio: string = await this.convertBlobToBase64(data);

    const body: any = {
      language_in: speaker === 'advisor' ? this.advisor : this.guest,
      language_out: speaker === 'advisor' ? this.guest.audioLanguage.split('-')[0] : this.advisor.split('-')[0],
      audio
    };

    return this.httpClient.post(url, body, this.httpOptions).toPromise();
  };

  /**
   * Encode blob into Base64
   */
  private convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
    });
  }
}
