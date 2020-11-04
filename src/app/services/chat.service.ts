import { Chat } from '../models/db/chat';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Member } from '../models/db/member';
import { MessageWrapped } from '../models/translate/message-wrapped';
import { CryptService } from './crypt.service';
import { Support } from '../models/support';
import { Role } from '../models/role';
import { DeviceService } from './device.service';
import { Device } from '../models/device';
import { advisorName } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public messagesStored: MessageWrapped[] = [];
  public support: Support;
  public switchTime: number;

  private device: Device;

  constructor(private db: AngularFireDatabase, private cryptService: CryptService, private deviceService: DeviceService) {
    this.device = this.deviceService.getUserDevice();
  }

  getRoomId() {
    return (10000000 + Math.floor(Math.random() * 10000000)).toString();
  }

  initChatMono(advisorRole: Role) {
    this.support = Support.MONODEVICE
    const roomId = this.getRoomId();
    this.messagesStored = this.messagesStored.map((m) => this.cryptService.encryptWrapped(m, roomId));
    if(this.messagesStored.length > 0){
      const advisor = { id: Date.now().toString(), firstname: advisorName, role: advisorRole, device: this.device };
      const guest: Member = { id: Date.now().toString(), firstname: 'DE', role: Role.GUEST, device: this.device };
      this.create(roomId, [advisor, guest], this.messagesStored,this.support, 0);
    }
  }

  initChatMulti(roomId: string, advisorRole: Role): Promise<boolean> {
    this.support = Support.MULTIDEVICE
    const advisor = { id: Date.now().toString(), firstname: advisorName, role: advisorRole, device: this.device };
    return this.create(roomId, [advisor], [], this.support,0);
  }

  initChatMonoMulti(roomId: string, advisorRole: Role): Promise<boolean> {
    this.support = Support.MONOANDMULTIDEVICE
    this.messagesStored = this.messagesStored.map((m) => this.cryptService.encryptWrapped(m, roomId));
    const advisor = { id: Date.now().toString(), firstname: advisorName, role: advisorRole, device: this.device };
    this.switchTime = Date.now()
    return this.create(roomId, [advisor], this.messagesStored,this.support, this.switchTime);
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

  getSwitchTime(roomId: string): Observable<number> {
    return this.db.object(`chats/${roomId}/switchTime`).valueChanges() as Observable<number>;
  }

  sendMessageWrapped(roomId: string, messageWrapped: MessageWrapped): string {
    messageWrapped = this.cryptService.encryptWrapped(messageWrapped, roomId);
    const itemsRef = this.db.list(`chats/${roomId}/messages`);
    itemsRef.set(messageWrapped.time.toString(), messageWrapped);
    return messageWrapped.time.toString();
  }

  addMember(roomId: string, newMember: Member): string {
    const itemsRef = this.db.list(`chats/${roomId}/members`);
    itemsRef.set(Date.now().toString(), newMember);
    if (newMember.role === Role.GUEST) {
      const messageWrapped: MessageWrapped = { notification: newMember.firstname + ' est connecté', time: Date.now() };
      return this.sendMessageWrapped(roomId, messageWrapped);
    }
  }

  getMembers(roomId: string): Observable<Array<Member>> {
    return this.db.list(`chats/${roomId}/members`).valueChanges() as Observable<Array<Member>>;
  }

  deleteMember(roomId: string, firstname: string) {
    const messageWrapped: MessageWrapped = { notification: firstname + ' est déconnecté', time: Date.now() };
    this.sendMessageWrapped(roomId, messageWrapped);
  }

  notifyAdvisor(roomId: string, firstname: string) {
    const messageWrapped: MessageWrapped = { notification: firstname + ' est déconnecté', time: Date.now() };
    this.sendMessageWrapped(roomId, messageWrapped);
  }

  delete(roomId: string): Promise<boolean> {
    const promise = this.db.object(`chats/${roomId}`).remove();
    return promise
      .then((_) => true)
      .catch((err) => {
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
        return false;
      });
  }

  private create(roomId: string, members: Member[], messagesWrapped: MessageWrapped[], support: Support, switchTime: number): Promise<boolean> {
    const chat: Chat = { lasttime: new Date().getTime().toString(), members: members, messages: messagesWrapped, active: true, support: support, switchTime: switchTime };
    const promise = this.db.object(`chats/${roomId}`).set(chat);
    return promise
      .then((_) => true)
      .catch((err) => {
        return false;
      });
  }
}
