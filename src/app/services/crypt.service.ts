import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class CryptService {
  private key: string;
  private iv: string;
  constructor(private settingsService: SettingsService) {
    this.settingsService.user.subscribe((user) => {
      if (user !== null) {
        this.key = user.roomId;
        this.iv = crypto.enc.Hex.parse(user.firstname);
      }
    });
  }

  public encrypt(text: string) {
    return crypto.AES.encrypt(text, this.key, {
      iv: this.iv,
      mode: crypto.mode.CBC,
      padding: crypto.pad.Pkcs7,
    }).toString();
  }
  public decrypt(text: string, iv: string): string {
    return crypto.AES.decrypt(text, this.key, { iv: crypto.enc.Hex.parse(iv), mode: crypto.mode.CBC, padding: crypto.pad.Pkcs7 }).toString(crypto.enc.Utf8);
  }
}
