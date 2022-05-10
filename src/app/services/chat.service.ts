import { Chat } from '../models/db/chat';
import { Injectable } from '@angular/core';
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
import * as moment from 'moment';
import { Guest } from '../models/db/guest';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public messagesStored: MessageWrapped[] = [];
  public support: Support = Support.MONODEVICE;
  private readonly device: Device;

  constructor(private readonly db: AngularFirestore, private readonly cryptService: CryptService, private readonly deviceService: DeviceService, private readonly errorService: ErrorService) {
    this.device = this.deviceService.getUserDevice();
  }

  createRoomId() {
    const randomValues = window.crypto.getRandomValues(new Uint32Array(1)); // Compliant for security-sensitive use cases
    return String(Math.floor(randomValues[0] / 100));
  }

  public initChatMono(roomId: string, advisorRole: Role): Promise<boolean> {
    if (!roomId) {
      roomId = this.createRoomId();
    }
    this.support = Support.MONODEVICE;
    this.messagesStored = this.messagesStored.map((m) => this.cryptService.encryptWrapped(m, roomId));
    if (this.messagesStored.length > 0) {
      const advisor: Member = {
        id: Date.now().toString(),
        firstname: AdvisorDefaultName,
        role: advisorRole,
        device: this.device,
      };
      const guest: Member = {
        id: Date.now().toString(),
        firstname: GuestDefaultName,
        role: Role.GUEST,
        device: this.device,
      };
      const mwsWithoutAudio = this.messagesStored.map((mw) => {
        const { audioHtml, ...msg } = mw.message;
        return {
          ...mw,
          message: msg,
        };
      });
      const chatCreateDto: InitChatDto = { members: [advisor, guest], messages: mwsWithoutAudio };
      return this.create(roomId, chatCreateDto);
    }
    return Promise.resolve(false);
  }

  initChatMulti(roomId: string, advisorRole: Role): Promise<boolean> {
    this.support = Support.MULTIDEVICE;
    const advisor = {
      id: Date.now().toString(),
      firstname: AdvisorDefaultName,
      role: advisorRole,
      device: this.device,
    };
    const chatCreateDto: InitChatDto = { members: [advisor] };

    return this.create(roomId, chatCreateDto);
  }

  initChatMonoMulti(roomId: string, advisorRole: Role): Promise<boolean> {
    this.support = Support.MONOANDMULTIDEVICE;
    this.messagesStored = this.messagesStored.map((m) => this.cryptService.encryptWrapped(m, roomId));
    const mwsWithoutAudio = this.messagesStored.map((mw) => {
      const { audioHtml, ...msg } = mw.message;
      return {
        ...mw,
        message: msg,
      };
    });
    const advisor = {
      id: Date.now().toString(),
      firstname: AdvisorDefaultName,
      role: advisorRole,
      device: this.device,
    };
    const chatCreateDto: InitChatDto = { members: [advisor], messages: mwsWithoutAudio, monoToMultiTime: Date.now() };
    return this.create(roomId, chatCreateDto);
  }

  initUnknownChat(roomId: string) {
    this.support = Support.MULTIDEVICE;
    const guest: Member = {
      id: Date.now().toString(),
      firstname: GuestDefaultName,
      role: Role.GUEST,
      device: this.device,
    };
    const chatCreateDto: InitChatDto = { members: [guest], messages: [] };
    this.create(roomId, chatCreateDto);
    this.errorService.save(ERROR_FUNC_UNKNOWCHAT);
  }

  hasRoom(roomId: string): Observable<boolean> {
    return new Observable((observer) => {
      this.db
        .doc(`chats/${roomId}`)
        .get()
        .subscribe((docSnapshot) => {
          observer.next(docSnapshot.exists);
          observer.complete();
        });
    });
  }

  async sendMessageWrapped(roomId: string, messageWrapped: MessageWrapped) {
    messageWrapped = this.cryptService.encryptWrapped(messageWrapped, roomId);
    const itemsRef = this.db.doc(`chats/${roomId}`);
    await itemsRef.update({ messages: firebase.firestore.FieldValue.arrayUnion(messageWrapped) });
  }

  async addMember(roomId: string, newMember: Member) {
    const messageWrapped: MessageWrapped = { notification: newMember.firstname + ' est connecté', time: Date.now() };
    const itemsRef = this.db.doc(`chats/${roomId}`);
    await itemsRef.update({
      members: firebase.firestore.FieldValue.arrayUnion(newMember),
      messages: firebase.firestore.FieldValue.arrayUnion(messageWrapped),
    });
  }

  async updateGuestStatus(roomId: string, guest: Guest) {
    const itemsRef = this.db.doc(`chats/${roomId}`);
    await itemsRef.update({ guests: firebase.firestore.FieldValue.arrayUnion({ id: guest.id, status: true }) });
  }

  async notifyAdvisor(roomId: string, firstname: string) {
    const messageWrapped: MessageWrapped = { notification: firstname + ' est déconnecté', time: Date.now() };
    await this.sendMessageWrapped(roomId, messageWrapped);
  }

  getChat(roomId: string): Observable<Chat> {
    return this.db.doc(`chats/${roomId}`).valueChanges() as Observable<Chat>;
  }

  updateChatStatus(roomId: string, active: boolean): Promise<boolean> {
    return this.db
      .doc(`chats/${roomId}`)
      .update({ active })
      .then((_) => true)
      .catch((_) => {
        return false;
      });
  }

  private create(roomId: string, initChatDto: InitChatDto): Promise<boolean> {
    const expiryDate = moment().add(2, 'hours');
    const chat: Chat = {
      lasttime: new Date().getTime().toString(),
      expiryDate: parseInt(expiryDate.format('x')),
      guests: [],
      active: true,
      support: this.support,
      ...initChatDto,
    };
    return this.db
      .doc(`chats/${roomId}`)
      .set(chat)
      .then((_) => true)
      .catch((_) => {
        return false;
      });
  }
}

interface InitChatDto {
  members: Array<Member>;
  messages?: Array<MessageWrapped>;
  monoToMultiTime?: number;
}
