// Angular
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Models
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public advisor: User = { firstname: '', lastname: '', language: 'fr-FR' };
  public guest: BehaviorSubject<User> = new BehaviorSubject<User>({ firstname: '', lastname: '', language: '' });
  public audio: boolean = false;
  public newConversation: boolean = true;
  public recordMode: boolean = true;

  constructor() {}

  getTarget(): Observable<User> {
    return this.guest.asObservable()
  }
 
  public reset(): void {
    this.guest.next({ firstname: '', lastname: '', language: '' });
  }
}
