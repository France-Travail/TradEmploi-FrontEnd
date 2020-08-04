import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
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

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss'],
})
export class TranslationComponent implements OnInit, AfterViewChecked {
  @Input() user: string;

  @ViewChild('scrollMe') private chatScroll: ElementRef;

  public chat: Message[] = [];
  public guestTextToEdit: string;
  public advisorTextToEdit: string;
  public isMobile: boolean;
  public autoListenValue: string = 'Ecouter automatiquement';
  private audio: boolean;

  public isGuest: boolean = false;
  public isMultiDevices: boolean = false;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private toastService: ToastService,
    private settingsService: SettingsService,
    private chatService:ChatService,
    private textToSpeechService: TextToSpeechService,
    private navbarService: NavbarService
  ) {
    this.settingsService.user.subscribe((user) => {
      if(user.language.audio === undefined){
        this.goto('choice');
      }
      this.isMultiDevices = user.roomId !== undefined;
      if(this.isMultiDevices){
        this.initMultiDevice(user.roomId)

      }
      this.isGuest = user.firstname !== undefined;
    });

    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      this.isMobile = result.matches;
    });
    this.navbarService.handleTabs(window.location.pathname);
  }


  ngOnInit(): void {
    this.audio = true;
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

  public async addToChat(event) {
    let hasDot = new RegExp('^[ .s]+$').test(event.message);
    if (event.message !== '' && !hasDot) {
      this.chat.push(event);
      const audio = await this.textToSpeechService.getSpeech(event.translation, event.target)
      if(audio){
        this.textToSpeechService.audioSpeech.play();
      }
    } else {
      if (!hasDot) {
        this.toastService.showToast('Traduction indisponible momentanément. Merci de réessayer plus tard.', 'toast-error');
      }
    }
  }

  public closeConversation() {
    this.dialog.open(RateDialogComponent, {
      width: this.isMobile ? '100%' : '800px',
      height: this.isMobile ? '100%' : '700px',
      panelClass: 'customDialog',
    });
  }

  public switchAudio() {
    this.audio = !this.audio;
  }

  private initMultiDevice = (roomId) => {
    this.chat =[]
    this.chatService.getMessages(roomId).subscribe(messages => {
      if(messages.length > 0){
        if(this.chat.length === 0){
          messages.forEach(message => {
            this.addToChat(message)
          })
        }else{
          this.addToChat(messages[messages.length - 1])
        }
      }
    })
  }
}
