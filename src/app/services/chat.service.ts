import { Chat } from '../models/db/chat';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Message } from '../models/translate/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private db: AngularFireDatabase
  ) {
  }

  create(roomId: string) : Promise<Boolean>{
    const chat: Chat = { lasttime: new Date().getTime().toString(), members: [], messages: []};
    const promise = this.db.object(`chats/${roomId}`).set(chat);
    return promise
      .then(_ => true)
      .catch(err => {
        console.log(err, 'You dont have access!')
        return false
    });
  }

  getMessages(roomId: string) {
    return this.db.list(`chats/${roomId}/messages`, ref => {
      return ref.orderByChild('timestamp');
      }).valueChanges();
  }

  getMembers(roomId:string): Observable<Array<string>> {
    return this.db.list(`chats/${roomId}/members`).valueChanges() as Observable<Array<string>>
  }

  deleteMember(roomId:string, member:string){
    return this.db.list(`chats/${roomId}/members`).remove(member)
    .then(_ => true)
    .catch(err => {
      console.log(err, 'You dont have access!')
      return false
  });
  }

  getAll(roomId:string){
    this.db.list(`chats/${roomId}/members`).snapshotChanges().pipe(map(items => {
      return items.map(a => {
        const data = a.payload.val();
        const key = a.payload.key;
        return {key, data};
      });
    }));
  }

  sendMessage(roomId:string, message: Message): string{
    return this.db.list(`chats/${roomId}/messages`).push(message).key
  }

  addMember(roomId:string, newMembers: string): string{
    return this.db.list(`chats/${roomId}/members`).push(newMembers).key
  }

  delete(roomId: string) : Promise<Boolean>{
    const promise = this.db.object(`chats/${roomId}`).remove();
    return promise
      .then(_ => true)
      .catch(err => {
        console.log(err, 'You dont have access!')
        return false
    });
  }
}
