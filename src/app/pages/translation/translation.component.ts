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
import { Support } from 'src/app/models/support';

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
  public autoListenValue: string = 'Ecouter automatiquement';
  public isGuest: boolean = false;
  public isMultiDevices: boolean = false;

  private isAudioPlay: boolean;
  private user: User;
  private endIdDialogRef: MatDialogRef<any, any>;
  private support: Support;

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
    private cryptService: CryptService
  ) {
    this.settingsService.user.subscribe((user) => {
      if (user != null) {
        if (user.language !== undefined && user.language.audio === undefined) {
          this.goto('choice');
        }
        this.isGuest = user.role === Role.GUEST;
        this.isMultiDevices = user.roomId !== undefined;
        this.messagesWrapped = [];
        this.chatService.messagesStored = [];
        this.support = this.chatService.support;
        if (this.isMultiDevices) {
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
    this.isAudioPlay = true;
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
    this.navbarService.show();
  }

  ngOnDestroy() {
    if (this.isMultiDevices) {
      this.isAudioPlay = false;
    }
  }

  scrollToBottom(): void {
    try {
      this.chatScroll.nativeElement.scrollTop = this.chatScroll.nativeElement.scrollHeight;
    } catch (err) { }
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
      this.translateMessage(message);
    } else {
      if (!hasDot) {
        this.toastService.showToast('Traduction indisponible momentanément. Merci de réessayer plus tard.', 'toast-error');
      }
    }
  }

  public closeConversation() {
    this.openModal(RateDialogComponent, '700px', false);
  }

  public switchAudio() {
    this.isAudioPlay = !this.isAudioPlay;
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

  private async deactivate() {
    const isMulti: string = this.user.roomId;
    if (isMulti) {
      this.deactivateMulti();
    } else {
      this.deactivateMono();
    }
    this.settingsService.reset();
  }

  private deactivateMulti() {
    if (this.isGuest) {
      const isEndClosed: boolean = this.endIdDialogRef === undefined;
      if (isEndClosed) {
        this.chatService.notifyAdvisor(this.user.roomId, this.user.firstname);
      }
    } else {
      this.chatService.updateChatStatus(this.user.roomId, false);
    }
  }

  private deactivateMono() {
    this.chatService.initChatMono(this.user.role);
  }

  private initMultiDevices = (roomId) => {
    this.chatService.getChatStatus(roomId).subscribe((active) => {
      if (active != null && active) {
        this.addMultiMessageToChat(roomId);
      } else {
        this.isAudioPlay = false;
        if (this.isGuest) {
          this.openModal(EndComponent, '300px', true);
        }
      }
    });
  }

  private async addMultiMessageToChat(roomId: string) {
    let monoToMultiTime: number;
    if (this.support === Support.MONOANDMULTIDEVICE || this.isGuest) {
      this.chatService.getMonoToMultiTime(roomId).subscribe(s => monoToMultiTime = s);
    }
    this.chatService.getMessagesWrapped(roomId).subscribe((mw: MessageWrapped[]) => {
      if (this.support === Support.MONOANDMULTIDEVICE || this.isGuest) {
        mw = mw.filter((messagesWrapped) => messagesWrapped.time > monoToMultiTime);
      }
      if (mw.length > 0) {
        if (this.messagesWrapped.length === 0) {
          mw.forEach((m: MessageWrapped) => {
            m = this.cryptService.decryptWrapped(m, roomId);
            this.addToChat(m);
          });
        } else {
          mw[mw.length - 1] = this.cryptService.decryptWrapped(mw[mw.length - 1], roomId);
          this.addToChat(mw[mw.length - 1]);
        }
      }
    });
  }

  private translateMessage(message: Message) {
    const languageTarget: Language = this.getLanguageTarget(message);
    if (this.isMultiDevices && message.languageOrigin === languageTarget.written) {
      this.setTranslateMessage(message, message.text, languageTarget.audio);
    } else {
      this.translateService.translate(message.text, languageTarget.written).subscribe(async (translate) => {
        this.setTranslateMessage(message, translate, languageTarget.audio);
      });
    }
  }

  private async setTranslateMessage(message: Message, translate: string, languageTarget: string) {
    message.translation = translate;
    const audio = await this.textToSpeechService.getSpeech(translate, languageTarget);
    if (audio) {
      if (message.time > this.settingsService.user.value.connectionTime) {
        if (this.isAudioPlay) {
          this.textToSpeechService.audioSpeech.play();
        }
      }
      message.audioHtml = this.textToSpeechService.audioSpeech;
      this.textToSpeechService.audioSpeech = undefined;
    }
    this.sendMessage(message);
  }

  private sendMessage(message: Message) {
    const isSender: boolean = this.isSender(message.member);
    const messageWrapped: MessageWrapped = { message, isSender, time: message.time };
    this.messagesWrapped.push(messageWrapped);
    this.messagesWrapped.sort((msg1, msg2) => msg1.time - msg2.time);
    this.chatService.messagesStored.push({ message, time: message.time });
  }

  private isSender(member: string): boolean {
    if (this.isMultiDevices) {
      const isSender = member === this.user.firstname;
      return !isSender && this.user.firstname === undefined && member === AdvisorDefaultName ? true : isSender;
    }
    return false;
  }

  private sendNotification(messageWrapped: MessageWrapped) {
    this.messagesWrapped.push(messageWrapped);
    this.messagesWrapped.sort((msg1, msg2) => msg1.time - msg2.time);
  }

  private getLanguageTarget(message: Message): Language {
    if (this.isMultiDevices) {
      return this.user.role === Role.ADVISOR || this.user.role === Role.ADMIN ? this.settingsService.defaultLanguage : this.user.language;
    }
    return message.role === Role.ADVISOR || message.role === Role.ADMIN ? this.user.language : this.settingsService.defaultLanguage;
  }

  private openModal(component, height, disableClose) {
    return this.dialog.open(component, {
      width: '800px',
      height,
      panelClass: 'customDialog',
      disableClose,
    });
  }
}
