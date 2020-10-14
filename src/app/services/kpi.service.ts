import axios from 'axios';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ToastService } from 'src/app/services/toast.service';
import { ErrorCodes } from '../models/errorCodes';

@Injectable({
    providedIn: 'root'
})
export class KpiService {

    constructor(private toastService: ToastService) {}

    public async createKpi(roomId:String){
        const key = await this.getKey()
        const url = environment.firefunction.url
        const data= {
        query: `
            mutation kpi {
            kpi(roomId: "`+roomId+`")
            }`
        }
        return new Promise(async (resolve, reject) => {axios({
            method:'post',
            headers:{'Authorization': key },
            data,
            url
        }).then((_) =>{
            resolve()
        }).catch((err) => {
            this.toastService.showToast(ErrorCodes.EXPORTERROR, 'toast-error');
            reject(err)
        })
        })
    }

    private getKey(): Promise<string>{
        const url = environment.firefunction.url;
        const data= {
        query: `
        mutation LoginUser {
            login(key: "`+environment.firefunction.key+`")
        }`
    }
    return new Promise(async (resolve, reject) => {axios({
        method:'post',
        data,
        url
        }).then((response) =>{
            const data = response.data.data.login
            resolve(data)
        }).catch((err) => {
            this.toastService.showToast(ErrorCodes.EXPORTERROR, 'toast-error');
            reject(err)
        })
    })
    }
}
