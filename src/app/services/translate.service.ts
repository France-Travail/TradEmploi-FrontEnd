import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lang } from '../models/lang';
import axios from 'axios';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  public guest: Lang = { audioLanguage: '', writtenLanguage: '' };
  public advisor: string = 'fr-FR';

  public translate(text: string, speaker: string): Observable<string> {
    const target: string = speaker === 'advisor' ? this.guest.writtenLanguage.split('-')[0] : this.advisor.split('-')[0];
    const url = `https://translation.googleapis.com/language/translate/v2?key=${environment.gcp.apiKey}`;
    const data = {
      q: text,
      target: target,
      format: 'text',
    };
    return new Observable((observer) => {
      axios({
        method: 'post',
        headers: { 'content-type': 'application/json; charset=utf-8' },
        data: data,
        url: url,
      })
        .then((response) => {
          const res = response.data.data.translations[0].translatedText;
          observer.next(res);
          observer.complete();
        })
        .catch((error) => {
          observer.error('Traduction indisponible momentanément');
          throw new Error('An error occurred when api translate called: api not available');
        });
    });
  }
}
