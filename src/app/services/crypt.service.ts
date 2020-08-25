import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';
import { MessageWrapped } from '../models/translate/message-wrapped';

@Injectable({
  providedIn: 'root',
})
export class CryptService {
  private key: string;
  constructor() {}

  public encrypt(text: string, iv: string) {
    return crypto.AES.encrypt(text, this.key, {
      iv: crypto.enc.Hex.parse(iv),
      mode: crypto.mode.CBC,
      padding: crypto.pad.Pkcs7,
    }).toString();
  }
  public decrypt(text: string, iv: string): string {
    return crypto.AES.decrypt(text, this.key, { iv: crypto.enc.Hex.parse(iv), mode: crypto.mode.CBC, padding: crypto.pad.Pkcs7 }).toString(crypto.enc.Utf8);
  }
  public setKey(key: string) {
    this.key = key;
  }
  public encryptWrapped(messageWrapped: MessageWrapped): MessageWrapped {
    if (messageWrapped.message) {
      messageWrapped.message.text = this.encrypt(messageWrapped.message.text, messageWrapped.message.member);
      messageWrapped.message.translation = this.encrypt(messageWrapped.message.translation, messageWrapped.message.member);
    }
    return messageWrapped;
  }
  public decryptWrapped(messageWrapped: MessageWrapped): MessageWrapped {
    if (messageWrapped.message) {
      messageWrapped.message.text = this.decrypt(messageWrapped.message.text, messageWrapped.message.member);
      messageWrapped.message.translation = this.decrypt(messageWrapped.message.translation, messageWrapped.message.member);
    }
    return messageWrapped;
  }
}
