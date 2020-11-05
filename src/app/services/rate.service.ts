import axios from 'axios';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Rate } from '../models/rate';
import { environment } from '../../environments/environment';
import { ToastService } from 'src/app/services/toast.service';
import { ErrorCodes } from '../models/errorCodes';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class RateService {
  private rate: Rate;
  private db: string = 'rates';

  constructor(private afs: AngularFirestore, private toastService: ToastService, private tokenService: TokenService) {}

  public rateConversation(rate: Rate): void {
    this.rate = rate;
  }

  public saveRate(): Promise<void> {
    return this.afs
      .collection(this.db)
      .doc<Rate>(this.afs.createId())
      .set(this.rate);
  }

  public async getRates(){
    const key = await this.tokenService.getKey();
    const url = environment.firefunction.url;
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
          }
        }`
    };
    return new Promise(async (resolve, reject) => {axios({
        method: 'post',
        headers: {Authorization: key },
        data,
        url
      }).then((response) => {
          const dataRates = response.data.data.rates;
          const rates = [];
          dataRates.forEach(element => {
            rates.push({
              Date: element.day,
              Heure: element.hour,
              Langage: element.language,
              'Facilité de l\'outil': element.facilityGrade,
              'Efficacité de l\'outil': element.efficientGrade,
              'Echange liée aux missions Pôle Emploi': element.offerLinked,
              'Commentaire libre': element.comment,
            });
          });
          resolve(rates);
      }).catch((err) => {
          this.toastService.showToast(ErrorCodes.EXPORTERROR, 'toast-error');
          reject(err);
      });
    });
  }

  public getRateByHistoricId(id: string): Observable<Rate[]> {
    return this.afs
      .collection<Rate>(this.db, rf => rf.where('historyId', '==', id))
      .valueChanges();
  }

}
