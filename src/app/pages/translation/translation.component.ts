// Angular
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { NavbarItem } from 'src/app/models/navbar-item';
// Services
import { TranslateService } from 'src/app/services/translate.service';
import { RateDialogComponent } from './dialogs/rate-dialog/rate-dialog.component';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss'],
})
export class TranslationComponent implements OnInit {
  @Input() user: string;

  public navBarItems: NavbarItem[] = [];
  public sentMessage: string;
  public messages: any[] = [];
  public guestTextToEdit: string;
  public advisorTextToEdit: string;
  public isMobile: boolean;

  public autoListenValue: string = 'Ecouter automatiquement';
  private audio: boolean;
  constructor(private translateService: TranslateService, public dialog: MatDialog, private router: Router, private breakpointObserver: BreakpointObserver) {
    // Start watching screen size modication
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      this.isMobile = result.matches;
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

  public toEdit(message) {
    message.user === 'guest' ? (this.guestTextToEdit = message.message) : (this.advisorTextToEdit = message.message);
  }

  public addToThread(event) {
    this.messages.push(event);
    const lastIndex = this.messages.length - 1;
    const lastSpeech = this.messages[lastIndex].translatedSpeech;
    if (this.audio && lastSpeech !== undefined) {
      lastSpeech.play();
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
