import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ErrorCodes } from '../models/errorCodes';
import { ToastService } from './toast.service';
import axios from 'axios';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private toastService: ToastService, private settingService: SettingsService) { }


  public getKey(): Promise<string> {
    const url = environment.firefunction.url;
    const data = {
      query: `
    mutation LoginUser {
        login(key: "`+ environment.firefunction.key + `")
    }`
    }
    return new Promise(async (resolve, reject) => {
      axios({
        method: 'post',
        data,
        url
      }).then((response) => {
        const token = response.data.data.login
        this.settingService.token = token
        resolve(token)
      }).catch((err) => {
        this.toastService.showToast(ErrorCodes.EXPORTERROR, 'toast-error');
        reject(err)
      })
    })
  }

}
