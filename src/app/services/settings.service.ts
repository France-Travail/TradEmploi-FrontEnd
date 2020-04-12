// Angular
import { Injectable } from '@angular/core';

// Models
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public advisor: User = { firstname: '', lastname: '', language: 'fr-FR' };
  public guest: BehaviorSubject<User> = new BehaviorSubject<User>({ firstname: '', lastname: '', language: '' });
  public audio: boolean = false;
  public newConversation: boolean = true;
  public recordMode: boolean = false;

  constructor() {}

  public reset(): void {
    this.guest.next({ firstname: '', lastname: '', language: '' });
  }
}
