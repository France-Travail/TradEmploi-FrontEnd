import axios from 'axios';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ToastService } from 'src/app/services/toast.service';
import { ErrorCodes } from '../models/errorCodes';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root'
})
export class KpiService {

    constructor(private toastService: ToastService, private tokenService: TokenService) { }

    public async createKpi(roomId: String) {
        const key = await this.tokenService.getKey()
        const url = environment.firefunction.url
        const data = {
            query: `
            mutation kpi {
            kpi(roomId: "`+ roomId + `")
            }`
        }
        return new Promise(async (resolve, reject) => {
            axios({
                method: 'post',
                headers: { 'Authorization': key },
                data,
                url
            }).then((_) => {
                resolve()
            }).catch((err) => {
                this.toastService.showToast(ErrorCodes.EXPORTERROR, 'toast-error');
                reject(err)
            })
        })
    }

    public async getkpi() {
        const key = await this.tokenService.getKey()
        const url = environment.firefunction.url
        const data = {
            query: `
            query kpi {
                kpi {
                day
                begin
                end
                duration
                languages
                translationMode
                support
                guestsDevices
                advisorDevice
              }
            }`
        }
        return new Promise(async (resolve, reject) => {
            axios({
                method: 'post',
                headers: { 'Authorization': key },
                data,
                url
            }).then((response) => {
                const data = response.data.data.kpi
                let kpi = []
                data.forEach(element => {
                    kpi.push({
                        "Date conversation": element.day,
                        "Durée conversation": element.begin,
                        "Heure début conversation": element.end,
                        "Heure fin conversation": element.duration,
                        "Langue(s)": element.languages,
                        "Mode traduction": element.translationMode,
                        "Support traduction": element.support,
                        "Conseiller : Device": element.advisorDevice,
                        "DE(s) : Device": element.guestsDevices
                    });
                });
                resolve(kpi)
            }).catch((err) => {
                this.toastService.showToast(ErrorCodes.EXPORTERROR, 'toast-error');
                reject(err)
            })
        })
    }


}
