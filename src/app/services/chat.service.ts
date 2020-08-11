import { Chat } from './../models/db/chat';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Message } from '../models/translate/message';
import { User } from '../models/user';
import { Member } from '../models/db/member';

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

  getMessages(roomId: string): Observable<Array<Message>>  {
    return this.db.list(`chats/${roomId}/messages`, ref => {
      return ref.orderByChild('timestamp');
      }).valueChanges()  as Observable<Array<Message>> ;
  }
  
  hasRoom(roomId:string) : Observable<boolean> {
    return new Observable((observer) => {
      this.db.list<Chat>(`chats/${roomId}`).valueChanges().subscribe(chats => {
            observer.next(chats.length > 0);
            observer.complete();
      })
    })
  }

  deleteMember(roomId:string, key:string){
    return this.db.list(`chats/${roomId}/members/${key}`).remove()
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

  addMember(roomId:string, newMembers: Member): string{
    return this.db.list(`chats/${roomId}/members`).push(newMembers).key
  }

  getMembers(roomId:string): Observable<Array<Member>> {
    return this.db.list(`chats/${roomId}/members`).valueChanges() as Observable<Array<Member>>
  }

  updateMemberStatus(roomId: string, key: string, active:boolean) : Promise<Boolean>{
    return this.db.object(`chats/${roomId}/members/${key}/active`).set(active).then(_ => true)
      .catch(err => {
        console.log(err, 'You dont have access!')
        return false
    });
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
