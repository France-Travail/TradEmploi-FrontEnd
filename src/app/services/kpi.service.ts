import axios from 'axios';
import { ERROR_TECH_EXPORT_KPI } from './../models/error/errorTechnical';
import { ErrorService } from 'src/app/services/error.service';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { JwtGwSingleton } from '../models/token/JwtGwSingleton';
@Injectable({
  providedIn: 'root',
})
export class KpiService {
  constructor(private errorService: ErrorService) {}

  public async getkpi() {
    const gwToken = JwtGwSingleton.getInstance().getToken().token;
    const url = `${environment.gcp.gateWayUrl}/reporting`;
    const data = {
      query: `
            query Kpi {
                kpi {
                    day
                    conversation{
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
            }`,
    };
    return axios({
      method: 'POST',
      headers: { Authorization: `Bearer ${gwToken}` },
      data,
      url,
    })
      .then((response) => {
        const dataKpi = response.data.data.kpi;
        const kpi = [];
        dataKpi.forEach((element) => {
          kpi.push({
            'Date conversation': element.day ? element.day : 'N.A',
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
            'Date erreur': element.error && element.error != null ? element.error.day : '',
            'Heure erreur': element.error && element.error != null ? element.error.hours : '',
            'Erreur technique': element.error && element.error != null ? element.error.descriptions : '',
          });
        });
        return kpi;
      })
      .catch((error) => {
        this.errorService.save(ERROR_TECH_EXPORT_KPI);
        throw new Error(error);
      });
  }
}
