import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {Router} from '@angular/router';
import {RateDialogComponent} from './dialogs/rate-dialog/rate-dialog.component';
import {EndComponent} from './dialogs/end/end.component';
import {SettingsService} from '../../services/settings.service';
import {ShareComponent} from './dialogs/share/share.component';
import {AuthorizeComponent} from './dialogs/authorize/authorize.component';
import { exportCsv, isIOS } from '../../utils/utils';
import {ComponentCanDeactivate} from '../../guards/pending-changes.guard';
import {MessageWrapped} from '../../models/translate/message-wrapped';
import {ToastService} from '../../services/toast.service';
import {ChatService} from '../../services/chat.service';
import {NavbarService} from '../../services/navbar.service';
import {TranslateService} from '../../services/translate.service';
import {CryptService} from '../../services/crypt.service';
import {Role} from '../../models/role';
import {ENGLISH} from '../../data/sentence';
import {IntroMessage} from '../../models/vocabulary';
import {Message} from '../../models/translate/message';
import {MessageSingleton} from '../../models/MessageSingleton';
import {Chat} from '../../models/db/chat';
import {Support} from '../../models/kpis/support';
import {Language} from '../../models/language';
import {ERROR_FUNC_TRANSLATION, ERROR_FUNC_TTS} from '../../models/error/errorFunctionnal';
import {User} from '../../models/user';
import {TextToSpeechService} from '../../services/text-to-speech.service';
import {VOCABULARY} from '../../data/vocabulary';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {ErrorService} from '../../services/error.service';
import { Subject } from 'rxjs';
import { GlobalService } from '../../services/global.service';

const toastError = 'toast-error';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss'],
})
export class TranslationComponent implements OnInit, AfterViewChecked, ComponentCanDeactivate, OnDestroy {
  @ViewChild('scrollMe') private readonly chatScroll: ElementRef;
  public messagesWrapped = [];
  public guestTextToEdit: string;
  public advisorTextToEdit: string;
  public isMobile: boolean;
  public autoListenValue = 'Ecoute automatique';
  public isGuest = false;
  public isMultiDevices = false;
  public roomId: string;
  public isAudioSupported = false;
  private isAudioPlay: boolean;
  private user: User;
  private readonly endIdDialogRef: MatDialogRef<any>;
  private support: Support;
  private vocalSupported = false;
  private readonly authorizationHandled = [];
  private isScrollingToUp = false;
  private readonly audioSpeechToPlay = [];
  private audioSpeechIsPlaying = false;
  protected microAdmin = new Subject<boolean>();
  protected microGuest = new Subject<boolean>();
  public ios: boolean;

  constructor(
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly toastService: ToastService,
    private readonly errorService: ErrorService,
    private readonly settingsService: SettingsService,
    private readonly chatService: ChatService,
    private readonly textToSpeechService: TextToSpeechService,
    private readonly navbarService: NavbarService,
    private readonly translateService: TranslateService,
    private readonly cryptService: CryptService,
    private readonly globalService: GlobalService
  ) {
    this.settingsService.user.subscribe((user) => {
      if (user != null) {
        if (user.language === undefined || user.language.audio === undefined) {
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
    this.ios = isIOS();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
    this.navbarService.show();
    this.playAudioSpeech();
  }

  ngOnDestroy() {
    if (this.isMultiDevices) {
      this.isAudioPlay = false;
    }
    this.toastService.closeToast();
  }

  private async selectStartNotifications(): Promise<void> {
    const introMessage = ENGLISH.introMessage;
    if (this.isMultiDevices) {
      this.isGuest ? this.introMessageGuest(introMessage) : this.introMessageAdmin(introMessage);
    } else {
      this.sendNotification({notification: introMessage.welcomeFR, time: Date.now()});
      const welcomeRAW = await this.translateService.translate(introMessage.welcomeFR, this.getLanguageTargetDe(), this.globalService.currentUserDomain, false );
      this.sendNotification({notification: welcomeRAW, time: Date.now()});
      if (!this.vocalSupported) {
        this.sendNotification({notification: introMessage.voiceavailabilityFR, time: Date.now()});
        this.sendNotification({notification: introMessage.voiceavailabilityRAW, time: Date.now()});
      }
    }
  }

  private introMessageGuest(notification: IntroMessage) {
    this.sendNotification({notification: notification.notifMultiRAW, time: Date.now()});
    this.sendNotification({notification: notification.welcomeRAW, time: Date.now()});
    if (!this.vocalSupported) {
      this.sendNotification({notification: notification.voiceavailabilityRAW, time: Date.now()});
    }
  }

  private introMessageAdmin(notification: IntroMessage) {
    this.sendNotification({notification: notification.notifMultiFR, time: Date.now()});
    this.sendNotification({notification: notification.welcomeFR, time: Date.now()});
    if (!this.vocalSupported) {
      this.sendNotification({notification: notification.voiceavailabilityFR, time: Date.now()});
    }
  }

  scroll() {
    this.isScrollingToUp = true;
  }

  scrollToBottom(): void {
    try {
      if (!this.isScrollingToUp) {
        this.chatScroll.nativeElement.scrollTop = this.chatScroll.nativeElement.scrollHeight;
      }
    } catch (err) {
    }
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
    this.isScrollingToUp = false;
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
        this.toastService.showToast('Traduction indisponible momentanément. Merci de réessayer plus tard.', toastError);
      }
    }
  }

  public closeConversation() {
    const languages = this.messagesWrapped.filter((m) => m.message !== undefined).map((m) => m.message.languageOrigin);
    this.openModal(RateDialogComponent, '500px', false, languages);
  }

  public async exportConversation() {
    const data = JSON.parse(JSON.stringify(this.messagesWrapped))
      .filter((m) => m.message !== undefined)
      .map((mw) => {
        const m = mw.message;
        delete m.audioHtml;
        delete m.hour;
        delete m.time;
        delete m.flag;
        if (m.hasOwnProperty('member')) {
          this.renameKey(m, 'member', 'membre');
        }
        this.renameKey(m, 'languageOrigin', 'langueOrigine');
        this.renameKey(m, 'languageName', 'langueDE');
        this.renameKey(m, 'text', 'texte');
        this.renameKey(m, 'translation', 'traduction');
        this.renameKey(m, 'translationMode', 'modeTraduction');
        return m;
      });
    await this.translateDEMessages(data);
    exportCsv(data, 'conversation_');
  }

  private getDELanguages(): string[] {
    const languages = this.messagesWrapped
      .filter((m) => m.message !== undefined)
      .map((m) => m.message.languageOrigin)
      .filter((l) => l !== 'fr-FR');
    return [...new Set(languages)];
  }

  private async translateDEMessages(data) {
    if (!this.isMultiDevices) {
      return;
    }
    const languages = this.getDELanguages();
    for (const row of data) {
      if (row.role === Role.ADVISOR) {
        const traduction = [];
        for (const language of languages) {
          const translate = await this.translateService.translate(row.texte, language, this.globalService.currentUserDomain, false, row.languageOrigin);
          traduction.push(translate);
        }
        row.traduction = traduction.join(',');
        row.langueDE = languages.join(',');
      }
    }
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
    event.returnValue = confirmationMessage;
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
    return this.chatService.initChatMono(this.user.roomId, this.user.role);
  }

  private readonly initMultiDevices = (roomId) => {
    this.chatService.getChat(roomId).subscribe((chat: Chat) => {
      if (chat && chat.active) {
        const isNewAuthorization = chat.guests.filter((g) => this.authorizationHandled.indexOf(g.id) === -1).length > 0 && !this.isGuest;
        isNewAuthorization ? this.authorizeGuest(chat.guests) : this.addMultiMessageToChat(chat, roomId);
      } else {
        this.isAudioPlay = false;
        if (this.isGuest) {
          this.openModal(EndComponent, '300px', true);
          this.settingsService.reset();
        }
      }
    }, this.errorService.handleAfsError);
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

  private callTranslateApi(message: Message, languageTarget: any) {
    this.translateService
      .translate(message.text, languageTarget.written, this.globalService.currentUserDomain, false, message.languageOrigin)
      .then((translate) => {
        this.setTranslateMessage(message, translate, languageTarget.audio);
      })
      .catch((_) => {
        this.toastService.showToast(ERROR_FUNC_TRANSLATION.description, toastError);
      });
  }

  private setTranslateMessage(message: Message, translate: string, languageTarget: string) {
    message.translation = translate;
    const listenMulti = !this.isSender(message.member, message.languageOrigin) && this.isAudioSupported;
    const listenMono = this.isAudioSupported || message.role === Role.GUEST;
    const listen = this.isMultiDevices ? listenMulti : listenMono;

    if (listen) {
      // remove words start with *
      translate = translate.replace(/\*/g, '');
      this.textToSpeechService
        .getSpeech(translate, languageTarget, message.isFemaleVoice)
        .then((_) => {
          const audioSpeech = this.textToSpeechService.audioSpeech;
          if (audioSpeech) {
            if (message.time > this.settingsService.user.value.connectionTime && this.isAudioPlay) {
              this.audioSpeechToPlay.push(audioSpeech);
            }
            message.audioHtml = audioSpeech;
          }
        })
        .catch((_) => {
          this.toastService.showToast(ERROR_FUNC_TTS.description, toastError);
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
      const isSender: boolean = this.isSender(message.member, message.languageOrigin);
      const messageWrapped: MessageWrapped = {message, isSender, time: message.time};
      this.messagesWrapped.push(messageWrapped);
      this.messagesWrapped.sort((msg1, msg2) => msg1.time - msg2.time);
      this.chatService.messagesStored.push({message, time: message.time});
    } else {
      MessageSingleton.getInstance().setAlreadyPlay(true);
    }
    return true;
  }

  private isSender(member: string, languageOrigin: string): boolean {
    if (this.isMultiDevices) {
      const isSender = languageOrigin === this.user.language.written && member === this.user.firstname;
      return !isSender && this.user.firstname === undefined ? true : isSender;
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

  private getLanguageTargetDe(): string {
    return this.isMultiDevices ? this.settingsService.defaultLanguage.written : this.user.language.written;
  }

  private openModal(component, height, disableClose, guest?, languages?) {
    return this.dialog.open(component, {
      width: '750px',
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

  private renameKey(obj, oldKey, newKey) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }

  private playAudioSpeech() {
    if (this.audioSpeechIsPlaying || this.audioSpeechToPlay.length === 0) {
      return;
    }
    const audioSpeech = this.audioSpeechToPlay.shift();
    audioSpeech.play();
    audioSpeech.onplay = () => {
      this.audioSpeechIsPlaying = true;
    };
    audioSpeech.onended = () => {
      this.audioSpeechIsPlaying = false;
    };
  }

  public microAdminToGuest() {
    this.microGuest.next(true);
  }

  public microGuestToAdmin() {
    this.microAdmin.next(true);
  }
}
