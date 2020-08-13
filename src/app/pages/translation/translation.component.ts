import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit, AfterViewChecked, ViewChild, ElementRef, HostListener } from '@angular/core';
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
import { MultiDevicesMessage } from 'src/app/models/translate/multi-devices-message';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss'],
})
export class TranslationComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe') private chatScroll: ElementRef;
  public multiDevicesMessages: MultiDevicesMessage[] = [];
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
    private chatService:ChatService,
    private textToSpeechService: TextToSpeechService,
    private navbarService: NavbarService,
    private translateService: TranslateService
  ) {
    this.settingsService.user.subscribe((user) => {
      if(user != null){
        if(user.language !== undefined && user.language.audio === undefined){
          this.goto('choice');
        }
        this.isGuest = user.role === Role.GUEST;
        this.isMultiDevices = user.roomId !== undefined;
        if(this.isMultiDevices){
          this.initMultiDevices(user.roomId)
          if(!this.isGuest){
            this.handleNotification(user.roomId)
          }
        }
        this.user = user
      }
      this.isGuest = user.firstname !== undefined;
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

  public addToChat(message: Message) {
    let hasDot = new RegExp('^[ .s]+$').test(message.text);
    if (message.text !== '' && !hasDot) {
      const languageTarget = this.getLanguageTarget(message)
      this.translateService.translate(message.text, languageTarget).subscribe(async translate => {
          message.translation = translate
          const audio = await this.textToSpeechService.getSpeech(translate, languageTarget)
          if(audio){
            if(this.isAudioPlay){
              this.textToSpeechService.audioSpeech.play();
            }
            message.audioHtml = this.textToSpeechService.audioSpeech
          }
          this.sendMessage(message)
        })
    } else {
      if (!hasDot) {
        this.toastService.showToast('Traduction indisponible momentanément. Merci de réessayer plus tard.', 'toast-error');
      }
    }
  }

  public closeConversation() {
    this.dialog.open(RateDialogComponent, {
      width: '800px',
      height: '700px',
      panelClass: 'customDialog',
    });
  }

  public switchAudio() {
    this.isAudioPlay = !this.isAudioPlay;
  }

  // public canDeactivate(event): Observable<boolean> | boolean {
  //   this.settingsService.user.subscribe((user) => {
  //     this.isGuest = user.role == Role.GUEST;
  //     if (user != null && this.isGuest) {
  //       this.chatService.deleteMember(this.user.roomId, this.user.id)
  //       return false
  //     } else {
  //       this.chatService.delete(this.user.roomId);
  //       return false
  //     }
  //   })
  //   return
  // }

  private initMultiDevices = (roomId) => {
    this.multiDevicesMessages =[]
    this.chatService.getMessages(roomId).subscribe(messages => {
      if(messages.length > 0){
        if(this.multiDevicesMessages.length === 0){
          messages.forEach(message => {
            this.addToChat(message)
          })
        }else{
          this.addToChat(messages[messages.length - 1])
        }
      }
    })
  }

  private handleNotification(roomId: string){
    this.chatService.getMembers(roomId).subscribe(members => {
      if(members.length > 0){
        const member =  members[members.length - 1]
        const notification = member.active ? ' est connecté' : ' est déconnecté'
        const chatInput: MultiDevicesMessage = {notification:  member.firstname + notification}
        this.multiDevicesMessages.push(chatInput)
      }
    })
  }

  private getLanguageTarget(message: Message){
    if(this.isMultiDevices){
      return this.user.role ===  Role.ADVISOR || this.user.role ===  Role.ADMIN ? this.settingsService.defaultLanguage
      : this.user.language.written
    }
    return message.role ===  Role.ADVISOR || message.role ===  Role.ADMIN? this.user.language.written
    :  this.settingsService.defaultLanguage ;
  }

  // @HostListener('window:unload', ['$event'])
  // unloadHandler(e) {
  //   this.canDeactivate(event)
  // }

  // @HostListener('window:beforeunload', ['$event'])
  // beforeunload(event) {
  //   this.canDeactivate(event)
  //   return false
  // }

  private sendMessage(message: Message){
    if(this.isMultiDevices){
      const chatInput: MultiDevicesMessage = {message: message}
      this.multiDevicesMessages.push(chatInput);
    }else{
      this.messages.push(message)
    }
  }
}
