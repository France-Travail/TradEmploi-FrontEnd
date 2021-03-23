import { Chat } from '../models/db/chat';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Member } from '../models/db/member';
import { MessageWrapped } from '../models/translate/message-wrapped';
import { CryptService } from './crypt.service';
import { Support } from '../models/kpis/support';
import { Role } from '../models/role';
import { DeviceService } from './device.service';
import { Device } from '../models/kpis/device';
import { AdvisorDefaultName, GuestDefaultName } from './settings.service';
import { ErrorService } from './error.service';
import { ERROR_FUNC_UNKNOWCHAT } from '../models/error/errorFunctionnal';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  public messagesStored: MessageWrapped[] = [];
  public support: Support = Support.MONODEVICE;
  private device: Device;

  constructor(private db2: AngularFirestore, private db: AngularFireDatabase, private cryptService: CryptService, private deviceService: DeviceService, private errorService: ErrorService) {
    this.device = this.deviceService.getUserDevice();
  }

  getRoomId() {
    return (10000000 + Math.floor(Math.random() * 10000000)).toString();
  }

  initChatMono(roomId: string, advisorRole: Role) {
    this.support = Support.MONODEVICE;
    this.messagesStored = this.messagesStored.map((m) => this.cryptService.encryptWrapped(m, roomId));
    if (this.messagesStored.length > 0) {
      const advisor: Member = { id: Date.now().toString(), firstname: AdvisorDefaultName, role: advisorRole, device: this.device };
      const guest: Member = { id: Date.now().toString(), firstname: GuestDefaultName, role: Role.GUEST, device: this.device };
      const chatCreateDto: InitChatDto = { members: [advisor, guest], messages: this.messagesStored };
      this.create(roomId, chatCreateDto);
    }
  }

  initChatMulti(roomId: string, advisorRole: Role): Promise<boolean> {
    this.support = Support.MULTIDEVICE;
    const advisor = { id: Date.now().toString(), firstname: AdvisorDefaultName, role: advisorRole, device: this.device };
    const chatCreateDto: InitChatDto = { members: [advisor] };
    console.log("initChatMulti");
    return this.create(roomId, chatCreateDto);
  }

  initChatMonoMulti(roomId: string, advisorRole: Role): Promise<boolean> {
    this.support = Support.MONOANDMULTIDEVICE;
    this.messagesStored = this.messagesStored.map((m) => this.cryptService.encryptWrapped(m, roomId));
    const advisor = { id: Date.now().toString(), firstname: AdvisorDefaultName, role: advisorRole, device: this.device };
    const chatCreateDto: InitChatDto = { members: [advisor], messages: this.messagesStored, monoToMultiTime: Date.now() };
    return this.create(roomId, chatCreateDto);
  }

  initUnknownChat(roomId: string) {
    this.support = Support.MULTIDEVICE;
    const guest: Member = { id: Date.now().toString(), firstname: GuestDefaultName, role: Role.GUEST, device: this.device };
    const chatCreateDto: InitChatDto = { members: [guest], messages: [] };
    this.create(roomId, chatCreateDto);
    this.errorService.save(ERROR_FUNC_UNKNOWCHAT);
  }

  hasRoom(roomId: string): Observable<boolean> {
    console.log("hasRoom");
    return new Observable((observer) => {
      this.db2
        .doc(`chats/${roomId}`)
        .valueChanges()
        .subscribe((chats) => {
          console.log('chats :>> ', chats);
          observer.next(chats !=null);
          observer.complete();
        });
    });
  }

  // getMessagesWrapped(roomId: string): Observable<Array<MessageWrapped>> {
  //   return this.db2.doc(`chats/${roomId}`).valueChanges() as Observable<Array<MessageWrapped>>;
  // }

  sendMessageWrapped(roomId: string, messageWrapped: MessageWrapped): string {
    messageWrapped = this.cryptService.encryptWrapped(messageWrapped, roomId);
    const itemsRef = this.db2.doc(`chats/${roomId}`);
    itemsRef.update({messages: firebase.firestore.FieldValue.arrayUnion(messageWrapped)});
    return messageWrapped.time.toString();
  }

  addMember(roomId: string, newMember: Member): string {
    const itemsRef = this.db2.doc(`chats/${roomId}`);
    itemsRef.update({members: firebase.firestore.FieldValue.arrayUnion(newMember)});
    if (newMember.role === Role.GUEST) {
      const messageWrapped: MessageWrapped = { notification: newMember.firstname + ' est connecté', time: Date.now() };
      return this.sendMessageWrapped(roomId, messageWrapped);
    }
  }

  getMembers(roomId: string): Observable<Array<Member>> {
    console.log("getMembers");
    return this.db2.collection(`chats/${roomId}/members`).valueChanges() as Observable<Array<Member>>;
  }

  deleteMember(roomId: string, firstname: string) {
    console.log("deleteMember");
    const messageWrapped: MessageWrapped = { notification: firstname + ' est déconnecté', time: Date.now() };
    this.sendMessageWrapped(roomId, messageWrapped);
  }

  notifyAdvisor(roomId: string, firstname: string) {
    console.log("notifyAdvisor");
    const messageWrapped: MessageWrapped = { notification: firstname + ' est déconnecté', time: Date.now() };
    this.sendMessageWrapped(roomId, messageWrapped);
  }

  delete(roomId: string): Promise<boolean> {
    console.log("delete");
    const promise = this.db2.doc(`chats/${roomId}`).delete();
    return promise
      .then(_ => true)
      .catch(_ => {
        return false;
      });
  }

  // getChatStatus(roomId: string): Observable<boolean> {
  //   console.log("getChatStatus");
  //   return this.db2.doc(`chats/${roomId}/active`).valueChanges() as Observable<boolean>;
  // }

  // getMonoToMultiTime(roomId: string): Observable<number> {
  //   console.log("getMonoToMultiTime");
  //   return this.db2.collection('chats').doc(`${roomId}/monoToMultiTime`).valueChanges() as Observable<number>;
  // }

  getChat(roomId: string): Observable<Chat> {
    console.log("getChat");
    return this.db2.doc(`chats/${roomId}`).valueChanges() as Observable<Chat>;
  }

  updateChatStatus(roomId: string, active: boolean): Promise<boolean> {
    console.log("updateChatStatus");
    return this.db2
      .collection('chats')
      .doc(`${roomId}`)
      .set({'active' : active})
      .then(_ => true)
      .catch(_ => {
        return false;
      });
  }

  private create(roomId: string, initChatDto: InitChatDto): Promise<boolean> {
    console.log("create");
    const chat: Chat = {
      lasttime: new Date().getTime().toString(),
      active: true,
      support: this.support,
      ...initChatDto
    };
    return this.db2
      .doc(`chats/${roomId}`)
      .set(chat)
      .then(_ => true)
      .catch(_ => {
        return false;
      });
  }
}

interface InitChatDto {
  members: Array<Member>;
  messages?: Array<MessageWrapped>;
  monoToMultiTime?: number;
}