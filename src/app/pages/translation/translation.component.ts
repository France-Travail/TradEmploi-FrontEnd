import { MessageWrapperComponent } from './components/message-wrapper/message-wrapper.component';
// Angular
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostListener, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { MatKeyboardService } from 'angular-onscreen-material-keyboard';
import { NavbarItem } from 'src/app/models/navbar-item';
import { TranslateService } from 'src/app/services/translate.service';
import { RateDialogComponent } from './dialogs/rate-dialog/rate-dialog.component';
import { Message } from 'src/app/models/translate/message';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss'],
})
export class TranslationComponent implements OnInit {
  @Input() user: string;

  public navBarItems: NavbarItem[] = [];
  public chat: Message[] = [];
  public guestTextToEdit: string;
  public advisorTextToEdit: string;
  public isMobile: boolean;
  public isTablet: boolean;
  public autoListenValue: string = 'Ecouter automatiquement';
  private audio: boolean;
  public marginKeyboard: string;

  constructor(
    private translateService: TranslateService,
    public dialog: MatDialog,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private keyboardService: MatKeyboardService
  ) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      this.isMobile = result.matches;
    });
    this.breakpointObserver.observe([Breakpoints.Tablet]).subscribe((result) => {
      this.isTablet = result.matches;
    });
    if (this.translateService.guest.audioLanguage === '') {
      this.goto('choice');
    }
    this.setNavBar();
  }
  ngOnInit(): void {
    this.audio = true;
  }

  public goto(where: string): void {
    this.router.navigate([where]);
  }

  public setNavBar(): void {
    this.navBarItems = [
      {
        icon: 'assets/icons/icon-languages-black.svg',
        infoTitle: 'LANGUES',
        link: 'choice',
        isDisplayed: true,
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
        isDisplayed: true,
      },
    ];
  }

  public editChat(message) {
    if (message.user === 'guest') {
      this.guestTextToEdit = message;
    } else {
      this.advisorTextToEdit = message;
    }
  }

  public addToChat(event) {
    if (event.message !== '') {
      this.marginKeyboard = this.keyboardService.isOpened ? '500px' : '0';
      this.chat.push(event);
      const lastIndex = this.chat.length - 1;
      const lastSpeech = this.chat[lastIndex].translatedSpeech;
      if (this.audio && lastSpeech !== undefined) {
        lastSpeech.play();
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

  @HostListener('window:click')
  @HostListener('mousemove')
  public MesssagesBoxActions() {
    const marginSize = this.isTablet ? '250px' : '500px';
    this.marginKeyboard = this.keyboardService.isOpened ? marginSize : '0';
  }
}
