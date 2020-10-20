import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ErrorCodes } from '../models/errorCodes';
import { ToastService } from './toast.service';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private toastService: ToastService) { }


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
        const data = response.data.data.login
        resolve(data)
      }).catch((err) => {
        this.toastService.showToast(ErrorCodes.EXPORTERROR, 'toast-error');
        reject(err)
      })
    })
  }

}
