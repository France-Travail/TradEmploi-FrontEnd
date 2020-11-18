import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { SettingsService } from './settings.service';
import { ERROR_TECH_EXPORT_TOKEN } from '../models/error/errorTechnical';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private settingService: SettingsService, private errorService: ErrorService) { }

  public getKey(): Promise<string> {
    const url = environment.firefunction.url;
    const data = {
      query: `
    mutation LoginUser {
        login(key: "` + environment.firefunction.key + `")
    }`
    };
    return axios({
        method: 'post',
        data,
        url
      }).then((response) => {
        const token = response.data.data.login;
        this.settingService.token = token;
        return token
      }).catch(_ => {
        this.errorService.save(ERROR_TECH_EXPORT_TOKEN)
        throw new Error(ERROR_TECH_EXPORT_TOKEN.description.toString()); 
      });
  }

}
