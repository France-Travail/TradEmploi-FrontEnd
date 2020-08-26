import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';
import { MessageWrapped } from '../models/translate/message-wrapped';

@Injectable({
  providedIn: 'root',
})
export class CryptService {

  public encryptWrapped(messageWrapped: MessageWrapped, roomId: string): MessageWrapped {
    if (messageWrapped.message) {
      messageWrapped.message.text = this.encrypt(messageWrapped.message.text, messageWrapped.message.time.toString(), roomId);
      messageWrapped.message.translation = this.encrypt(messageWrapped.message.translation, messageWrapped.message.time.toString(), roomId);
    }
    return messageWrapped;
  }

  public decryptWrapped(messageWrapped: MessageWrapped, roomId: string): MessageWrapped {
    if (messageWrapped.message) {
      messageWrapped.message.text = this.decrypt(messageWrapped.message.text, messageWrapped.message.time.toString(), roomId);
      messageWrapped.message.translation = this.decrypt(messageWrapped.message.translation, messageWrapped.message.time.toString(), roomId);
    }
    return messageWrapped;
  }

  private encrypt(text: string, iv: string, key: string): string {
    return crypto.AES.encrypt(text, key+iv, {
      iv: crypto.enc.Hex.parse(iv),
      mode: crypto.mode.CBC,
      padding: crypto.pad.Pkcs7,
    }).toString();
  }

  private decrypt(text: string, iv: string, key: string): string {
    return crypto.AES.decrypt(text, key+iv, { iv: crypto.enc.Hex.parse(iv), mode: crypto.mode.CBC, padding: crypto.pad.Pkcs7 }).toString(crypto.enc.Utf8);
  }
}
