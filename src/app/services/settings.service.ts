import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public advisor: User = { firstname: '', lastname: '', language: 'fr-FR' };
  public guest: User = { firstname: '', lastname: '', language: '' };
  public audio: boolean = false;
  public newConversation: boolean = true;

  constructor() {}

  public reset (): void {
    this.guest = { firstname: '', lastname: '', language: '' };
  }
}
