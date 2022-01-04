import axios from 'axios';
import { ERROR_TECH_EXPORT_KPI } from './../models/error/errorTechnical';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { TokenBrokerService } from './token-broker.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class KpiService {
  constructor(private readonly errorService: ErrorService, private readonly authService: AuthService, private readonly tokenBrokerService: TokenBrokerService) {
  }

  public async getkpi(isNotLogged: boolean) {
    if (isNotLogged) {
      const user = JSON.parse(localStorage.getItem('user'));
      await this.authService.login(environment.peama.login, environment.peama.password, user.email);
    }
    const gwToken = (await this.tokenBrokerService.getTokenGcp()).tokenGW;
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
            }`
    };
    return axios({
      method: 'POST',
      headers: { Authorization: `Bearer ${gwToken}` },
      data,
      url
    })
      .then((response) => {
        const dataKpi = response.data.data.kpi;
        const kpi = [];
        dataKpi.forEach((element) => {
          kpi.push({
            'Date conversation': this.getValue(element.day),
            'Durée conversation': this.getValue(element.conversation.duration),
            'Heure début conversation': this.getValue(element.conversation.begin),
            'Heure fin conversation': this.getValue(element.conversation.end),
            'Nb utilisateurs': this.getValue(element.conversation.nbUsers),
            'Langue(s)': this.getValue(element.conversation.languages),
            'Mode traduction': this.getValue(element.conversation.translationMode),
            'Support traduction': this.getValue(element.device.support),
            'Conseiller : Device': this.getValue(element.device.advisor.equipment),
            'DE(s) : Device': this.getValue(element.device.guest.equipment),
            'Conseiller : Système d\'exploitation (OS)': this.getValue(element.device.advisor.os.name),
            'Conseiller : Version OS': this.getValue(element.device.advisor.os.version),
            'Conseiller : Navigateur': this.getValue(element.device.advisor.browser.name),
            'Conseiller : Version Navigateur': this.getValue(element.device.advisor.browser.version),
            'DE(s) : Système d\'exploitation (OS)': this.getValue(element.device.guest.os.name),
            'DE(s)  : Version OS': this.getValue(element.device.guest.os.version),
            'DE(s): Navigateur': this.getValue(element.device.guest.browser.name),
            'DE : Version Navigateur': this.getValue(element.device.guest.browser.version),
            'Date erreur': element.error && element.error != null ? element.error.day : '',
            'Heure erreur': element.error && element.error != null ? element.error.hours : '',
            'Erreur technique': element.error && element.error != null ? element.error.descriptions : ''
          });
        });
        return kpi;
      })
      .catch((error) => {
        this.errorService.save(ERROR_TECH_EXPORT_KPI);
        throw new Error(error);
      });
  }

  private getValue(element) {
    return element ? element : 'N.A';
  }
}
