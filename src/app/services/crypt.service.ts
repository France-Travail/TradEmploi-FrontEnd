import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';
import { SettingsService } from './settings.service';
import { Message } from '../models/translate/message';

@Injectable({
  providedIn: 'root',
})
export class CryptService {
  private key: string;
  constructor(private settingsService: SettingsService) {
    this.settingsService.user.subscribe((user) => {
      if (user !== null) {
        this.key = user.roomId;
      }
    });
  }

  public encrypt(text: string) {
    return crypto.AES.encrypt(text, 'Secret Passphrase');
  }
  public decrypt(text: string): Message {
    return crypto.AES.decrypt(text, 'Secret Passphrase') as Message;
  }
}
