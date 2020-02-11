// Angular
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Firebase
import { AngularFirestore } from '@angular/fire/firestore';

// Models
import { Rate } from '../models/rate';

@Injectable({
  providedIn: 'root'
})
export class RateService {
  private rate: Rate; // The notation
  private db: string = 'rates'; // The collection's name

  constructor(private afs: AngularFirestore) {}

  /**
   * Rate the conversation with a number
   */
  public rateConversation(rate: Rate): void {
    this.rate = rate;
  }

  /**
   * Save the conversation into Cloud Firestore
   */
  public saveRate(): Promise<void> {
    return this.afs
      .collection(this.db)
      .doc<Rate>(this.afs.createId())
      .set(this.rate);
  }

  /**
   * Get the Rate
   */
  public getRateByHistoricId(id: string): Observable<Rate[]> {
    return this.afs
      .collection<Rate>(this.db, rf => rf.where('historyId', '==', id))
      .valueChanges();
  }
}
