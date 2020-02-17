// Angular
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Env
import { environment } from 'src/environments/environment.prod';

// Models
import { Voice } from '../models/voice';
import { Lang } from '../models/lang';

@Injectable({
  providedIn: 'root'
})
export class VoicesService {
  public voicesList: Voice[] = [];
  public guest: Lang = { audioLanguage: '', writtenLanguage: '' };
  public advisor: string = 'fr-FR';

  private url: string = 'https://texttospeech.googleapis.com/v1beta1';

  constructor(private httpClient: HttpClient) {
    this.getVoices().subscribe(data => {
      this.voicesList = data.voices;
    });
  }

  /**
   * Get the voices from Google API
   */
  public getVoices(): Observable<any> {
    const url = `${this.url}/voices?key=${environment.gcp.apiKey}`;

    return this.httpClient.get<any>(url);
  }
}
