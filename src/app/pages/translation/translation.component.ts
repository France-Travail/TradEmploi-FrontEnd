import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { Message } from 'src/app/models/translate/message';
import { RateDialogComponent } from './dialogs/rate-dialog/rate-dialog.component';
import { ToastService } from 'src/app/services/toast.service';
import { SettingsService } from 'src/app/services/settings.service';
import { ChatService } from 'src/app/services/chat.service';
import { TextToSpeechService } from 'src/app/services/text-to-speech.service';
import { Role } from 'src/app/models/role';
import { NavbarService } from 'src/app/services/navbar.service';
import { TranslateService } from 'src/app/services/translate.service';
import { User } from 'src/app/models/user';
import { ComponentCanDeactivate } from 'src/app/guards/pending-changes.guard';
import { MessageWrapped } from 'src/app/models/translate/message-wrapped';
import { EndComponent } from './dialogs/end/end.component';
import { CryptService } from 'src/app/services/crypt.service';
import { Language } from 'src/app/models/language';
import { AdvisorDefaultName } from './../../services/settings.service';
import { Support } from 'src/app/models/kpis/support';
import { ERROR_FUNC_TRANSLATION, ERROR_FUNC_TTS } from 'src/app/models/error/errorFunctionnal';
import { VOCABULARY } from 'src/app/data/vocabulary';
import { ENGLISH } from 'src/app/data/sentence';
import { IntroMessage } from 'src/app/models/vocabulary';
import { ShareComponent } from './dialogs/share/share.component';
import { MessageSingleton } from 'src/app/models/MessageSingleton';
import { Chat } from 'src/app/models/db/chat';
import { AuthorizeComponent } from './dialogs/authorize/authorize.component';
import { TagService } from '../../lib/atinternet/_services/tag.service';
import {exportCsv} from '../../utils/utils';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss'],
})
export class TranslationComponent implements OnInit, AfterViewChecked, ComponentCanDeactivate, OnDestroy {
  @ViewChild('scrollMe') private chatScroll: ElementRef;
  public messagesWrapped: MessageWrapped[] = [];
  public guestTextToEdit: string;
  public advisorTextToEdit: string;
  public isMobile: boolean;
  public autoListenValue: string = 'Ecoute automatique';
  public isGuest: boolean = false;
  public isMultiDevices: boolean = false;
  public roomId: string;
  public isAudioSupported = false;

  private isAudioPlay: boolean;
  private user: User;
  private endIdDialogRef: MatDialogRef<any, any>;
  private support: Support;
  private vocalSupported = false;
  private authorizationHandled: string[] = [];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private toastService: ToastService,
    private settingsService: SettingsService,
    private chatService: ChatService,
    private textToSpeechService: TextToSpeechService,
    private navbarService: NavbarService,
    private translateService: TranslateService,
    private cryptService: CryptService,
    private tagService: TagService
  ) {
    this.settingsService.user.subscribe((user) => {
      if (user != null) {
        if (user.language !== undefined && user.language.audio === undefined) {
          this.goto('choice');
        }
        this.isGuest = user.role === Role.GUEST;
        this.isMultiDevices = user.isMultiDevices;
        this.messagesWrapped = [];
        this.chatService.messagesStored = [];
        this.support = this.chatService.support;
        if (this.isMultiDevices) {
          this.roomId = user.roomId;
          this.initMultiDevices(user.roomId);
        }
        this.user = user;
      }
    });
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      this.isMobile = result.matches;
    });
  }

  ngOnInit(): void {
    this.navbarService.handleTabsTranslation();
    const language = VOCABULARY.find((i) => i.isoCode === this.user.language.audio || i.audioCode === this.user.language.audio);
    this.isAudioSupported = language.sentences.audioSupported !== undefined;
    this.vocalSupported = language.sentences.voiceNotSupported === undefined;
    this.isAudioPlay = true;
    this.scrollToBottom();
    this.selectStartNotifications();
    if (this.isGuest) {
      this.autoListenValue = this.isAudioSupported ? 'Listen automatically' : 'Audio unavailable';
    }
    const pageData = {
          name: 'translation',
          chapter1: 'chap1',
          chapter2: 'chap2',
          chapter3: 'chap3',
          level2: '1',
          customObject: this.user
        };
    this.tagService.pageSend(pageData);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
    this.navbarService.show();
  }

  ngOnDestroy() {
    if (this.isMultiDevices) {
      this.isAudioPlay = false;
    }
    this.toastService.closeToast();
  }

  private selectStartNotifications(): void {
    const introMessage = ENGLISH.introMessage;
    if (this.isMultiDevices) {
      this.isGuest ? this.introMessageGuest(introMessage) : this.introMessageAdmin(introMessage);
    } else {
      this.sendNotification({ notification: introMessage.welcomeFR, time: Date.now() });
      this.sendNotification({ notification: introMessage.welcomeRAW, time: Date.now() });
      if (!this.vocalSupported) {
        this.sendNotification({ notification: introMessage.voiceavailabilityFR, time: Date.now() });
        this.sendNotification({ notification: introMessage.voiceavailabilityRAW, time: Date.now() });
      }
    }
  }

  private introMessageGuest(notification: IntroMessage) {
    this.sendNotification({ notification: notification.notifMultiRAW, time: Date.now() });
    this.sendNotification({ notification: notification.welcomeRAW, time: Date.now() });
    if (!this.vocalSupported) {
      this.sendNotification({ notification: notification.voiceavailabilityRAW, time: Date.now() });
    }
  }
  private introMessageAdmin(notification: IntroMessage) {
    this.sendNotification({ notification: notification.notifMultiFR, time: Date.now() });
    this.sendNotification({ notification: notification.welcomeFR, time: Date.now() });
    if (!this.vocalSupported) {
      this.sendNotification({ notification: notification.voiceavailabilityFR, time: Date.now() });
    }
  }
  scrollToBottom(): void {
    try {
      this.chatScroll.nativeElement.scrollTop = this.chatScroll.nativeElement.scrollHeight;
    } catch (err) {}
  }

  public goto(where: string): void {
    this.router.navigate([where]);
  }

  public editChat(message: Message) {
    if (message.role === Role.GUEST) {
      this.guestTextToEdit = message.text;
    } else {
      this.advisorTextToEdit = message.text;
    }
  }

  public addToChat(messageWrapped: MessageWrapped) {
    const isNotGuestOnMultiDevices = !this.isGuest && this.isMultiDevices;
    const isNotification = messageWrapped.notification !== undefined;
    if (isNotGuestOnMultiDevices && isNotification) {
      this.sendNotification(messageWrapped);
    } else {
      if (!isNotification) {
        this.addMessageToChat(messageWrapped.message);
      }
    }
  }

  private addMessageToChat(message: Message) {
    const hasDot = new RegExp('^[ .s]+$').test(message.text);
    if (message.text !== '' && !hasDot) {
      const messageSingleton = MessageSingleton.getInstance();
      if (messageSingleton.getMessage() === null || messageSingleton.getMessage().date !== message.date || !messageSingleton.getAlreadyPlay()) {
        this.translateMessage(message);
        messageSingleton.setMessage(message);
        messageSingleton.setAlreadyPlay(true);
      } else {
        messageSingleton.setAlreadyPlay(false);
        this.sendMessage(messageSingleton.getMessage());
      }
    } else {
      if (!hasDot) {
        this.toastService.showToast('Traduction indisponible momentanément. Merci de réessayer plus tard.', 'toast-error');
      }
    }
  }

  public closeConversation() {
    const languages = this.messagesWrapped.filter((m) => m.message !== undefined).map((m) => m.message.languageOrigin);
    this.openModal(RateDialogComponent, '700px', false, languages);
  }

  public exportConversation() {
    const data = JSON.parse(JSON.stringify(this.messagesWrapped)).filter((m) => m.message !== undefined).map(mw => {
      const m = mw.message;
      delete m.audioHtml;
      delete m.hour;
      delete m.time;
      delete m.flag;
      if (m.hasOwnProperty('member')){
        this.renameKey(m, 'member', 'membre');
      }
      this.renameKey(m, 'languageOrigin', 'langueOrigine');
      this.renameKey(m, 'languageName', 'langueDE');
      this.renameKey(m, 'text', 'texte');
      this.renameKey(m, 'translation', 'traduction');
      this.renameKey(m, 'translationMode', 'modeTraduction');
      return m;
    });
    exportCsv(data, 'conversation_');
  }

  public switchAudio() {
    this.isAudioPlay = !this.isAudioPlay;
  }

  public share() {
    this.openModal(ShareComponent, '500px', false);
  }

  @HostListener('window:beforeunload', ['$event'])
  public async openPopUp(event) {
    const confirmationMessage = 'Warning: Leaving this page will result in any unsaved data being lost. Are you sure you wish to continue?';
    (event || window.event).returnValue = confirmationMessage;
    return 'confirmationMessage';
  }

  @HostListener('window:unload')
  public canDeactivate(): any {
    this.deactivate();
  }

  private deactivate() {
    if (this.user.isMultiDevices) {
      this.deactivateMulti();
    } else {
      this.deactivateMono();
    }
    localStorage.setItem('isLogged', 'false');
    this.settingsService.reset();
  }

  private async deactivateMulti() {
    if (this.isGuest) {
      const isEndClosed: boolean = this.endIdDialogRef === undefined;
      if (isEndClosed) {
        await this.chatService.notifyAdvisor(this.user.roomId, this.user.firstname);
      }
    } else {
      await this.chatService.updateChatStatus(this.user.roomId, false);
    }
  }

  private async deactivateMono() {
    return await this.chatService.initChatMono(this.user.roomId, this.user.role);
  }

  private initMultiDevices = (roomId) => {
    this.chatService.getChat(roomId).subscribe((chat: Chat) => {
      if (chat.active) {
        const isNewAuthorization = chat.guests.filter((g) => this.authorizationHandled.indexOf(g.id) === -1).length > 0 && !this.isGuest;
        isNewAuthorization ? this.authorizeGuest(chat.guests) : this.addMultiMessageToChat(chat, roomId);
      } else {
        this.isAudioPlay = false;
        if (this.isGuest) {
          this.openModal(EndComponent, '300px', true);
          this.settingsService.reset();
        }
      }
    });
  }

  private authorizeGuest(guests) {
    const lastAuthorization = guests[guests.length - 1];
    this.openModal(AuthorizeComponent, '200px', true, lastAuthorization);
    this.authorizationHandled.push(lastAuthorization.id);
  }

  private async addMultiMessageToChat(chat: Chat, roomId: string) {
    let monoToMultiTime: number;
    if (this.support === Support.MONOANDMULTIDEVICE) {
      monoToMultiTime = chat.monoToMultiTime ? chat.monoToMultiTime : 0;
    }
    let mw: MessageWrapped[] = chat.messages;
    if (this.support === Support.MONOANDMULTIDEVICE) {
      mw = mw.filter((messagesWrapped) => messagesWrapped.time > monoToMultiTime);
    }
    if (mw && mw.length > 0) {
      const notifLength = this.vocalSupported ? 2 : 3;
      if (this.messagesWrapped.length === notifLength) {
        mw.forEach((m: MessageWrapped) => {
          m = this.cryptService.decryptWrapped(m, roomId);
          this.addToChat(m);
        });
      } else {
        mw[mw.length - 1] = this.cryptService.decryptWrapped(mw[mw.length - 1], roomId);
        this.addToChat(mw[mw.length - 1]);
      }
    }
  }

  private translateMessage(message: Message) {
    const languageTarget: Language = this.getLanguageTarget(message);
    if (this.isMultiDevices && message.languageOrigin === languageTarget.written) {
      this.setTranslateMessage(message, message.text, languageTarget.audio);
    } else {
      this.callTranslateApi(message, languageTarget);
    }
  }

  private callTranslateApi(message: any, languageTarget: any) {
    this.translateService
      .translate(message.text, languageTarget.written)
      .then((translate) => {
        this.setTranslateMessage(message, translate, languageTarget.audio);
      })
      .catch((_) => {
        this.toastService.showToast(ERROR_FUNC_TRANSLATION.description, 'toast-error');
      });
  }

  private setTranslateMessage(message: Message, translate: string, languageTarget: string) {
    message.translation = translate;
    const listenMulti = !this.isSender(message.member) && this.isAudioSupported;
    const listenMono = this.isAudioSupported || message.role === Role.GUEST;
    const listen = this.isMultiDevices ? listenMulti : listenMono;
    if (listen) {
      this.textToSpeechService
        .getSpeech(translate, languageTarget)
        .then((_) => {
          if (this.textToSpeechService.audioSpeech) {
            if (message.time > this.settingsService.user.value.connectionTime && this.isAudioPlay) {
              this.textToSpeechService.audioSpeech.play();
            }
            message.audioHtml = this.textToSpeechService.audioSpeech;
          }
        })
        .catch((_) => {
          this.toastService.showToast(ERROR_FUNC_TTS.description, 'toast-error');
        });
    }
    this.textToSpeechService.audioSpeech = undefined;
    this.sendMessage(message);
  }

  private sendMessage(message: Message) {
    let hasMessage = [];
    if (this.messagesWrapped != null) {
      hasMessage = this.messagesWrapped.filter((mw) => {
        if (!mw.notification) {
          return mw.message.text === message.text && mw.message.time === message.time;
        }
      });
    }
    if (hasMessage.length === 0) {
      const isSender: boolean = this.isSender(message.member);
      const messageWrapped: MessageWrapped = { message, isSender, time: message.time };
      this.messagesWrapped.push(messageWrapped);
      this.messagesWrapped.sort((msg1, msg2) => msg1.time - msg2.time);
      this.chatService.messagesStored.push({ message, time: message.time });
    } else {
      MessageSingleton.getInstance().setAlreadyPlay(true);
    }
  }

  private isSender(member: string): boolean {
    if (this.isMultiDevices) {
      const isSender = member === this.user.firstname;
      return !isSender && this.user.firstname === undefined && member === AdvisorDefaultName ? true : isSender;
    }
    return false;
  }

  private sendNotification(messageWrapped: MessageWrapped) {
    const isNotificationExist = this.messagesWrapped.find((mw) => {
      if (mw.notification) {
        return mw.notification === messageWrapped.notification;
      }
      return false;
    });
    if (isNotificationExist === undefined) {
      this.messagesWrapped.push(messageWrapped);
      this.messagesWrapped.sort((msg1, msg2) => msg1.time - msg2.time);
    }
  }

  private getLanguageTarget(message: Message): Language {
    if (this.isMultiDevices) {
      return this.user.role === Role.ADVISOR ? this.settingsService.defaultLanguage : this.user.language;
    }
    return message.role === Role.ADVISOR ? this.user.language : this.settingsService.defaultLanguage;
  }

  private openModal(component, height, disableClose, guest?, languages?) {
    return this.dialog.open(component, {
      width: '800px',
      height,
      panelClass: 'customDialog',
      disableClose,
      data: {
        languages,
        roomId: this.roomId,
        guest,
      },
    });
  }
  private renameKey( obj, oldKey, newKey ) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }
}
