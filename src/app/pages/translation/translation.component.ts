import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material';
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
import { Observable } from 'rxjs';
import { MessageWrapped } from 'src/app/models/translate/message-wrapped';
import { EndComponent } from './dialogs/end/end.component';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss'],
})
export class TranslationComponent implements OnInit, AfterViewChecked, ComponentCanDeactivate {
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

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private toastService: ToastService,
    private settingsService: SettingsService,
    private chatService: ChatService,
    private textToSpeechService: TextToSpeechService,
    private navbarService: NavbarService,
    private translateService: TranslateService
  ) {
    this.settingsService.user.subscribe((user) => {
      if (user != null) {
        if (user.language !== undefined && user.language.audio === undefined) {
          this.goto('choice');
        }
        this.isGuest = user.firstname !== undefined;
        this.isMultiDevices = user.roomId !== undefined;
        if(this.isMultiDevices){
          this.initMultiDevices(user.roomId)
          this.isGuest = user.firstname !== undefined && user.firstname != this.settingsService.defaultName;
        }
        this.user = user;
      }
    });
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      this.isMobile = result.matches;
    });
    this.navbarService.handleTabsTranslation();
  }

  ngOnInit(): void {
    this.isAudioPlay = true;
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnDestroy(){
    if(this.isMultiDevices){
      this.isAudioPlay = false
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

  public editChat(message) {
    if (message.user === 'guest') {
      this.guestTextToEdit = message;
    } else {
      this.advisorTextToEdit = message;
    }
  }

  public addToChat(messageWrapped: MessageWrapped) {
    const isNotGuestOnMultiDevices = !this.isGuest && this.isMultiDevices
    const isNotification =messageWrapped.notification != undefined
    if(isNotGuestOnMultiDevices && isNotification){
      this.sendNotification(messageWrapped)
    }else{
      if(!isNotification){
        this.addMessageToChat(messageWrapped.message)
      }
    }
  }

  private addMessageToChat(message: Message){
    let hasDot = new RegExp('^[ .s]+$').test(message.text);
    if (message.text !== '' && !hasDot) {
      this.translateMessage(message)
    } else {
      if (!hasDot) {
        this.toastService.showToast('Traduction indisponible momentanément. Merci de réessayer plus tard.', 'toast-error');
      }
    }
  }

  public closeConversation() {
    this.openModal(RateDialogComponent, '700px', false)
  }

  public switchAudio() {
    this.isAudioPlay = !this.isAudioPlay;
  }


  @HostListener('window:unload')
  public canDeactivate(): Observable<boolean> | boolean {
    const isMultiDevices = this.user.roomId !== undefined
    if(isMultiDevices){
      this.settingsService.reset();
      if(this.user.role === Role.GUEST){
        this.chatService.deleteMember(this.user.roomId, this.user.firstname, this.user.id)
      }else{
        this.chatService.updateChatStatus(this.user.roomId, false)
        this.chatService.delete(this.user.roomId)
      }
    }
    return true
  }

  private initMultiDevices = (roomId) => {
    this.messagesWrapped = [];
    this.chatService.getChatStatus(roomId).subscribe(active => {
      if(active != null && active){
        this.addMultiMessageToChat(roomId)
      }else{
        this.isAudioPlay = false
        if(this.isGuest){
          this.openModal(EndComponent, '300px', true)
        }
      }
    })
  };

  private addMultiMessageToChat(roomId: string){
    this.chatService.getMessagesWrapped(roomId).subscribe((messagesWrapped) => {
      if (messagesWrapped.length > 0) {
        if (this.messagesWrapped.length === 0) {
          messagesWrapped.forEach((messageWrapped) => {
            this.addToChat(messageWrapped);
          });
        } else {
          this.addToChat(messagesWrapped[messagesWrapped.length - 1]);
        }
      }
    });
  }
  private translateMessage(message: Message){
    const languageTarget = this.getLanguageTarget(message)
    if(this.isMultiDevices && message.languageOrigin === languageTarget){
        this.setTranslateMessage(message, message.text,languageTarget)
    }else{
      this.translateService.translate(message.text, languageTarget).subscribe(async translate => {
        this.setTranslateMessage(message, translate, languageTarget)
      })
    }
  }

  private async setTranslateMessage(message: Message, translate, languageTarget: string){
    message.translation = translate
    if(this.isAudioPlay){
      const audio = await this.textToSpeechService.getSpeech(translate, languageTarget)
      if(audio){
        this.textToSpeechService.audioSpeech.play();
      }
      message.audioHtml = this.textToSpeechService.audioSpeech
    }
    this.sendMessage(message)
  }

  private sendMessage(message: Message){
    if(this.isMultiDevices){
      let isSender = message.member === this.user.firstname ;
      if(!isSender && this.user.firstname === undefined && message.member === this.settingsService.defaultName){
        isSender = true
      }
      const messageWrapped: MessageWrapped = {message: message, isSender: isSender, time: message.time}
      this.messagesWrapped.push(messageWrapped);
      this.messagesWrapped.sort((msg1, msg2) => msg1.time - msg2.time);
    } else {
      this.messages.push(message);
      this.messages.sort((msg1, msg2) => msg1.time - msg2.time);
    }
  }

  private sendNotification(messageWrapped: MessageWrapped){
      this.messagesWrapped.push(messageWrapped);
      this.messagesWrapped.sort((msg1, msg2) => msg1.time - msg2.time);
  }

  private getLanguageTarget(message: Message){
    if(this.isMultiDevices){
      return this.user.role ===  Role.ADVISOR || this.user.role ===  Role.ADMIN ? this.settingsService.defaultLanguage
      : this.user.language.written
    }
    return message.role ===  Role.ADVISOR || message.role ===  Role.ADMIN? this.user.language.written
    :  this.settingsService.defaultLanguage ;
  }

  private openModal(component, height, disableClose ) {
    this.dialog.open(component, {
      width: '800px',
      height: height,
      panelClass: 'customDialog',
      disableClose: disableClose
    });
  }

}
