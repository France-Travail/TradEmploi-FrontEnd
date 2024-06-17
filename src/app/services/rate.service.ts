import axios from 'axios';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rate } from '../models/rate';
import { environment } from '../../environments/environment';
import { ErrorService } from './error.service';
import { ERROR_TECH_EXPORT_STATS } from '../models/error/errorTechnical';
import { AuthService } from './auth.service';
import { TokenBrokerService } from './token-broker.service';
import { params } from '../../environments/params';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class RateService {
  private rate: Rate;
  private readonly db = 'rates';

  constructor(
    private readonly afs: AngularFirestore,
    private readonly errorService: ErrorService,
    private readonly authService: AuthService,
    private readonly tokenBrokerService: TokenBrokerService
  ) {}

  public rateConversation(rate: Rate): void {
    this.rate = rate;
  }

  public saveRate(): Promise<void> {
    return this.afs
      .collection(this.db)
      .doc<Rate>(this.afs.createId())
      .set(this.rate)
      .then((res) => {
        console.log(res);
      })
      .catch(this.errorService.handleAfsError);
  }

  public async getRates() {
    const gwToken = (await this.tokenBrokerService.getTokenGcp()).tokenGW;
    const url = `${environment.gcp.gateWayUrl}/reporting`;
    const data = {
      query: `
            query rates {
              rates{
                day
                hour
                language
                facilityGrade
                efficientGrade
                offerLinked
                comment
                conversationDuration
                typeEntretien
                nbMessagesAdvisor
                nbMessagesGuest
                user
                agency
                typeSTT
                isTradTonDoc
                nbTranslatedCharacters
              }
            }`,
    };
    return axios.post(url, data, {
      // Reactiver probleme CORS
      // withCredentials: true,
      headers: { Authorization: `Bearer ${gwToken}` },
    })
      .then((response) => {
        const dataRates = response.data.data.rates;
        const rates = [];
        dataRates.forEach((element) => {
          rates.push({
            Date: element.day,
            Heure: element.hour,
            Langage: element.language,
            conversationDuration: element.conversationDuration,
            'Qualité des traductions': element.facilityGrade,
            'Note de l\'outil': element.efficientGrade,
            'Problème technique': element.offerLinked,
            'Commentaire libre': element.comment,
            'Type entretien': element.typeEntretien,
            'Nombre message conseiller': element.nbMessagesAdvisor,
            'Nombre message Client': element.nbMessagesGuest,
            'identifiant utilisateur': element.user,
            'Identifiant agence': element.agency,
            'type STT': element.typeSTT,
            'Traduction de document': element.isTradTonDoc,
            'Nombre caractères traduits': element.nbTranslatedCharacters
          });
        });
        return rates;
      })
      .catch((error) => {
        this.errorService.save(ERROR_TECH_EXPORT_STATS);
        throw new Error(error);
      });
  }

  public getRateByHistoricId(id: string): Observable<Rate[]> {
    return this.afs
      .collection<Rate>(this.db, (rf) => rf.where('historyId', '==', id))
      .valueChanges();
  }
}
