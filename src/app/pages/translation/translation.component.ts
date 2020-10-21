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

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss'],
})
export class TranslationComponent implements OnInit, AfterViewChecked, ComponentCanDeactivate, OnDestroy {
  @ViewChild('scrollMe') private chatScroll: ElementRef;
  public messagesWrapped: MessageWrapped[] = [];
  public messages: Message[] = [];
  public guestTextToEdit: string;
  public advisorTextToEdit: string;
  public isMobile: boolean;
  public autoListenValue: string = 'Ecouter automatiquement';
  public isGuest: boolean = false;
  public isMultiDevices: boolean = false;

  private isAudioPlay: boolean;
  private user: User;
  private endIdDialogRef: MatDialogRef<any, any>;
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
        this.isGuest = user.firstname !== undefined && user.firstname !== this.settingsService.defaultName;
        this.isMultiDevices = user.roomId !== undefined;
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

  public editChat(message) {
    if (message.role === Role.GUEST) {
      this.guestTextToEdit = message;
    } else {
      this.advisorTextToEdit = message;
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
  public openPopUp(event): any {
    const confirmationMessage = 'Warning: Leaving this page will result in any unsaved data being lost. Are you sure you wish to continue?';
    (event || window.event).returnValue = confirmationMessage;
    return 'confirmationMessage';
  }

  @HostListener('window:unload')
  public canDeactivate(): any {
      this.deactivate();
  }

  private deactivate() {
    const isMultiDevices = this.user.roomId !== undefined;
    if (isMultiDevices) {
      if (this.isGuest) {
         this.settingsService.reset();
         const isEndClosed: boolean = this.endIdDialogRef === undefined;
         if (isEndClosed) {
          this.chatService.deleteMember(this.user.roomId, this.user.firstname, this.user.id);
        }
      } else {
        this.chatService.delete(this.user.roomId);
        this.settingsService.user.next({ ...this.settingsService.user.value, role: this.settingsService.user.value.role, language: this.settingsService.user.value.language, roomId: undefined, firstname: this.settingsService.user.value.firstname, connectionTime: Date.now() });
      }
    }
  }
  private initMultiDevices = (roomId) => {
    this.messagesWrapped = [];
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

  private addMultiMessageToChat(roomId: string) {
    this.chatService.getMessagesWrapped(roomId).subscribe((messagesWrapped) => {
      if (messagesWrapped.length > 0) {
        if (this.messagesWrapped.length === 0) {
          messagesWrapped.forEach((messageWrapped) => {
            messageWrapped = this.cryptService.decryptWrapped(messageWrapped, roomId);
            this.addToChat(messageWrapped);
          });
        } else {
          messagesWrapped[messagesWrapped.length - 1] = this.cryptService.decryptWrapped(messagesWrapped[messagesWrapped.length - 1], roomId);
          this.addToChat(messagesWrapped[messagesWrapped.length - 1]);
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
    if (this.isMultiDevices) {
      let isSender = message.member === this.user.firstname;
      if (!isSender && this.user.firstname === undefined && message.member === this.settingsService.defaultName) {
        isSender = true;
      }
      const messageWrapped: MessageWrapped = { message, isSender, time: message.time };
      this.messagesWrapped.push(messageWrapped);
      this.messagesWrapped.sort((msg1, msg2) => msg1.time - msg2.time);
    } else {
      this.messages.push(message);
    }
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
