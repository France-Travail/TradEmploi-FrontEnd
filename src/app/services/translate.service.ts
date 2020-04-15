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
  public advisor: string = environment.api.defaultLanguage;

  public translate(text: string, speaker: string): Observable<string> {
    const target: string = speaker === 'advisor' ? this.guest.writtenLanguage.split('-')[0] : this.advisor.split('-')[0];
    const provider: string = environment.api.provider;
    const data = {
      query: `
      {
        translate(text:"${text}",target:"${target}", provider:${provider}) {
          text
        }
      }`,
    };
    const url = `https://translation.googleapis.com/v3/innovation-214316:translateText?key=${environment.gcp.apiKey}`;
    const dataTemp = {
      contents: [text],
      targetLanguageCode: target,
    };

    return new Observable((observer) => {
      axios
        .post(url, dataTemp)
        .then((response) => {
          console.log('response :', response);
          const res = response.data.data.translations[0].translatedText
          console.log('res :', res);
          observer.next(response.data.data.translate[0].text);
          observer.complete();
        })
        .catch((error) => {
          observer.error('Traduction indisponible momentanément');
        });
    });
    // return new Observable(observer => {
    //   axios
    //     .post(environment.api.graphqlUrl, data, {
    //       auth: {
    //         username: environment.api.login,
    //         password: environment.api.password
    //       },
    //       timeout: 5000
    //     })
    //     .then(response => {
    //       observer.next(response.data.data.translate[0].text);
    //       observer.complete();
    //     })
    //     .catch(error => {
    //       observer.error('Traduction indisponible momentanément');
    //     });
    // });
  }
}
