import { Language } from './../models/language';
import axios from 'axios';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Rate } from '../models/rate';

@Injectable({
  providedIn: 'root'
})
export class RateService {
  private rate: Rate; // The notation
  private db: string = 'rates'; // The collection's name

  constructor(private afs: AngularFirestore) {}

  public rateConversation(rate: Rate): void {
    this.rate = rate;
  }

  public saveRate(): Promise<void> {
    return this.afs
      .collection(this.db)
      .doc<Rate>(this.afs.createId())
      .set(this.rate);
  }

  public getRates(){
    const url ="http://localhost:5000/pole-emploi-trad-dev/us-central1/api"
    const data= {
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
    }
    return new Promise(async (resolve, reject) => {axios({
        method:'post',
        headers:{'Authorization':'ZGFpc3lAYXBvbGxvZ3JhcGhxbC5jb20='},
        data,
        url
      }).then((response) =>{
          const data = response.data.data.rates
          let rates = []
          data.forEach(element => {
            rates.push({
              Date: element.day,
              Heure: element.hour,
              Langage: element.language,
              "Facilité de l'outil": element.facilityGrade,
              "Efficacité de l'outil": element.efficientGrade,
              "Echange liée aux missions Pôle Emploi": element.offerLinked,
              "Commentaire libre": element.comment,
            });
          });
          resolve(rates)
      }).catch((err) => {
          reject(err)
      })
    })
  }

  public getRateByHistoricId(id: string): Observable<Rate[]> {
    return this.afs
      .collection<Rate>(this.db, rf => rf.where('historyId', '==', id))
      .valueChanges();
  }
}
