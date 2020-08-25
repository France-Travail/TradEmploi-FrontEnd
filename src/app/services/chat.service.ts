import { Chat } from '../models/db/chat';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Member } from '../models/db/member';
import { MessageWrapped } from '../models/translate/message-wrapped';
import { CryptService } from './crypt.service';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private db: AngularFireDatabase, private cryptService: CryptService) {}

  create(roomId: string): Promise<Boolean> {
    const chat: Chat = { lasttime: new Date().getTime().toString(), members: [], messagesWrapped: [], active: true };
    const promise = this.db.object(`chats/${roomId}`).set(chat);
    return promise
      .then((_) => true)
      .catch((err) => {
        console.log(err, 'You dont have access!');
        return false;
      });
  }

  hasRoom(roomId: string): Observable<boolean> {
    return new Observable((observer) => {
      this.db
        .list<Chat>(`chats/${roomId}`)
        .valueChanges()
        .subscribe((chats) => {
          observer.next(chats.length > 0);
          observer.complete();
        });
    });
  }

  getMessagesWrapped(roomId: string): Observable<Array<MessageWrapped>> {
    return this.db.list(`chats/${roomId}/messages`).valueChanges() as Observable<Array<MessageWrapped>>;
  }

  sendMessageWrapped(roomId: string, messageWrapped: MessageWrapped): string {
    messageWrapped = this.cryptService.encryptWrapped(messageWrapped);
    return this.db.list(`chats/${roomId}/messages`).push(messageWrapped).key;
  }

  addMember(roomId: string, newMember: Member): string {
    const key = this.db.list(`chats/${roomId}/members`).push(newMember).key;
    const messageWrapped: MessageWrapped = { notification: newMember.firstname + ' est connecté', time: Date.now() };
    this.sendMessageWrapped(roomId, messageWrapped);
    return key;
  }

  getMembers(roomId: string): Observable<Array<Member>> {
    return this.db.list(`chats/${roomId}/members`).valueChanges() as Observable<Array<Member>>;
  }

  deleteMember(roomId: string, firstname: string, key: string) {
    const messageWrapped: MessageWrapped = { notification: firstname + ' est déconnecté', time: Date.now() };
    this.sendMessageWrapped(roomId, messageWrapped);
    return this.db
      .list(`chats/${roomId}/members/${key}`)
      .remove()
      .then((_) => true)
      .catch((err) => {
        console.log(err, 'You dont have access!');
        return false;
      });
  }

  delete(roomId: string): Promise<boolean> {
    const promise = this.db.object(`chats/${roomId}`).remove();
    return promise
      .then((_) => true)
      .catch((err) => {
        console.log(err, 'You dont have access!');
        return false;
      });
  }

  getChatStatus(roomId: string): Observable<boolean> {
    return this.db.object(`chats/${roomId}/active`).valueChanges() as Observable<boolean>;
  }

  updateChatStatus(roomId: string, active: boolean): Promise<boolean> {
    return this.db
      .object(`chats/${roomId}/active`)
      .set(active)
      .then((_) => true)
      .catch((err) => {
        console.log(err, 'You dont have access!');
        return false;
      });
  }
}
