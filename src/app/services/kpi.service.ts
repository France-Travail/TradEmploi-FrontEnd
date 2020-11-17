import { ERROR_EXPORT_KPI } from './../models/error/errorTechnical';
import { ErrorService } from 'src/app/services/error.service';
import axios from 'axios';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ToastService } from 'src/app/services/toast.service';
import { ErrorCodes } from '../models/errorCodes';
import { TokenService } from './token.service';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root'
})
export class KpiService {

    constructor(private toastService: ToastService, private tokenService: TokenService, private settingsService: SettingsService, private errorService: ErrorService) { }

    public async create(roomId: string) {
        if (roomId) {
            const key = this.settingsService.token ? this.settingsService.token : await this.tokenService.getKey();
            const url = environment.firefunction.url;
            const data = {
                query: `
                    mutation kpi {
                    kpi(roomId: "` + roomId + `")
                    }`
            };
            return new Promise(async (resolve, reject) => {
                axios({
                    method: 'post',
                    headers: { Authorization: key },
                    data,
                    url
                }).then((_) => {
                    resolve();
                }).catch((err) => {
                    this.toastService.showToast(ErrorCodes.DBERROR, 'toast-error');
                    reject(err);
                });
            });
        }
    }

    public async getkpi() {
        const key = await this.tokenService.getKey();
        const url = environment.firefunction.url;
        const data = {
            query: `
            query Kpi {
                kpi {
                    conversation{
                        day,
                        begin,
                        end,
                        duration
                        languages
                        nbUsers,
                        translationMode
                    }
                    device{
                        support
                        guest {
                            equipment
                            os {
                                name
                                version
                            }
                            browser {
                                name
                                version
                            }
                        }
                        advisor {
                            equipment
                            os {
                                name
                                version
                            }
                            browser {
                                name
                                version
                            }
                        }
                    }
                    error {
                        day
                        hours
                        descriptions
                    }
                }
            }`
        };
        return new Promise(async (resolve, reject) => {
            axios({
                method: 'post',
                headers: { Authorization: key },
                data,
                url
            }).then((response) => {
                const dataKpi = response.data.data.kpi;
                const kpi = [];
                dataKpi.forEach(element => {
                    kpi.push({
                        'Date conversation': element.conversation.day ? element.conversation.day : 'N.A',
                        'Durée conversation': element.conversation.duration ? element.conversation.duration : 'N.A',
                        'Heure début conversation': element.conversation.begin ? element.conversation.begin : 'N.A',
                        'Heure fin conversation': element.conversation.end ? element.conversation.end : 'N.A',
                        'Nb utilisateurs': element.conversation.nbUsers ? element.conversation.nbUsers : 'N.A',
                        'Langue(s)': element.conversation.languages ? element.conversation.languages : 'N.A',
                        'Mode traduction': element.conversation.translationMode ? element.conversation.translationMode : 'N.A',
                        'Support traduction': element.device.support ? element.device.support : 'N.A',
                        'Conseiller : Device': element.device.advisor.equipment ? element.device.advisor.equipment : 'N.A',
                        'DE(s) : Device': element.device.guest.equipment ? element.device.guest.equipment : 'N.A',
                        'Conseiller : Système d\'exploitation (OS)': element.device.advisor.os.name ? element.device.advisor.os.name : 'N.A',
                        'Conseiller : Version OS': element.device.advisor.os.version ? element.device.advisor.os.version : 'N.A',
                        'Conseiller : Navigateur': element.device.advisor.browser.name ? element.device.advisor.browser.name : 'N.A',
                        'Conseiller : Version Navigateur': element.device.advisor.browser.version ? element.device.advisor.browser.version : 'N.A',
                        'DE(s) : Système d\'exploitation (OS)': element.device.guest.os.name ? element.device.guest.os.name : 'N.A',
                        'DE(s)  : Version OS': element.device.guest.os.version ? element.device.guest.os.version : 'N.A',
                        'DE(s): Navigateur': element.device.guest.browser.name ? element.device.guest.browser.name : 'N.A',
                        'DE : Version Navigateur': element.device.guest.browser.version ? element.device.guest.browser.version : 'N.A',
                        'Date erreur': element.error ? element.error.day : '',
                        'Heure erreur': element.error ? element.error.hours : '',
                        'Erreur technique': element.error ? element.error.descriptions : ''
                    });
                });
                resolve(kpi);
            }).catch((err) => {
                this.toastService.showToast(ERROR_EXPORT_KPI.description as string, 'toast-error');
                this.errorService.saveError(ERROR_EXPORT_KPI)
                reject(err);
            });
        });
    }


}
