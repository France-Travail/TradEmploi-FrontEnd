import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit, AfterViewChecked, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Message } from 'src/app/models/translate/message';
import { TranslateService } from 'src/app/services/translate.service';
import { RateDialogComponent } from './dialogs/rate-dialog/rate-dialog.component';
import { ToastService } from 'src/app/services/toast.service';
import { AuthService } from 'src/app/services/auth.service';
import { SettingsService } from 'src/app/services/settings.service';
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
    private translateService: TranslateService,
    public dialog: MatDialog,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private toastService: ToastService,
    private settingsService: SettingsService
  ) {
    this.settingsService.getTarget().subscribe((user) => {
      this.isMultiDevices = user.roomId != '';
      this.isGuest = user.firstname != '' && user.firstname != null;
    });
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      this.isMobile = result.matches;
    });

    if (this.translateService.guest.audioLanguage === '') {
      this.goto('choice');
    }
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

<<<<<<< HEAD
=======
  public setNavBar(isAdmin: boolean): void {
    this.navBarItems = [
      {
        icon: 'assets/icons/icon-languages-black.svg',
        infoTitle: 'LANGUES',
        link: 'choice',
        isDisplayed: true,
      },
      {
        icon: 'assets/icons/icon-share-alt-solid.svg',
        infoTitle: 'PARTAGER',
        link: 'share',
        isDisplayed: isAdmin,
      },
      {
        icon: 'assets/icons/icon-chat-black.svg',
        infoTitle: 'HISTORIQUE',
        link: 'conversation',
        isDisplayed: true,
      },
      {
        icon: 'assets/icons/icon-settings-black.svg',
        infoTitle: 'PARAMÈTRES',
        link: 'settings/translation',
        isDisplayed: isAdmin,
      },
      {
        icon: 'assets/icons/icon-logout.svg',
        infoTitle: 'DECONNEXION',
        link: 'logout',
        isDisplayed: true,
      },
    ];
  }
>>>>>>> a13bc37e8848fc6d025213bdf8aab18e1fd5b4fe

  public editChat(message) {
    if (message.user === 'guest') {
      this.guestTextToEdit = message;
    } else {
      this.advisorTextToEdit = message;
    }
  }

  public addToChat(event) {
    let hasDot = new RegExp('^[ .s]+$').test(event.message);
    if (event.message !== '' && !hasDot) {
      this.chat.push(event);
      const lastIndex = this.chat.length - 1;
      const lastSpeech = this.chat[lastIndex].translatedSpeech;
      if (this.audio && lastSpeech !== undefined && lastSpeech !== null) {
        lastSpeech.play();
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
}
