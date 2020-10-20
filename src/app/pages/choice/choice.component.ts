import { EndComponent } from './../translation/dialogs/end/end.component';
import { Component, AfterContentInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { VOCABULARY } from 'src/app/data/vocabulary';
import { LanguagesComponent } from './dialog/languages/languages.component';
import { SettingsService } from 'src/app/services/settings.service';
import { TextToSpeechService } from 'src/app/services/text-to-speech.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { ChatService } from 'src/app/services/chat.service';
import { Role } from 'src/app/models/role';
import { ComponentCanDeactivate } from 'src/app/guards/pending-changes.guard';
import { Observable } from 'rxjs';
import { Vocabulary } from 'src/app/models/vocabulary';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss'],
})
export class ChoiceComponent implements AfterContentInit, ComponentCanDeactivate {
  public selectedCountriesData = [];
  public selectedCountries: string[] = ['en-GB', 'ar-XA', 'ps-AF', 'fa-IR', 'bn-BD', 'es-ES', 'de-DE', 'pt-PT', 'it-IT', 'zh-CN', 'ru-RU'];
  public toolTips: string[] = ['Autres langues'];
  public audioSpeech: HTMLAudioElement;
  public otherLanguageFr: string = 'AUTRES LANGUES';
  public otherLanguageEn: string = 'OTHER LANGUAGES';

  private endIdDialogRef: MatDialogRef<any, any>;
  private isMultiDevices: boolean = false;
  private user: User;
  constructor(
    private textToSpeechService: TextToSpeechService,
    private router: Router,
    private settingsService: SettingsService,
    public dialog: MatDialog,
    private navService: NavbarService,
    private chatService: ChatService
  ) {
    this.navService.handleTabsChoice();
    this.settingsService.user.subscribe((user) => {
      if (user != null) {
        this.isMultiDevices = user.roomId !== undefined;
        if (this.isMultiDevices && user.role === Role.GUEST) {
          this.endConversation(user.roomId);
        }
        this.user = user;
      } else {
        this.router.navigate(['/auth']);
      }
    });
  }

  ngAfterContentInit(): void {
    this.showMainLanguages();
    this.navService.show();
  }

  public selectLanguage(item: Vocabulary): void {
    const audioLanguage = item.audioCode ? item.audioCode : item.isoCode;
    this.settingsService.user.next({ ...this.settingsService.user.value, language: { audio: audioLanguage, written: item.isoCode }, connectionTime: Date.now() });
    if (this.user.role === Role.GUEST) {
      const user = JSON.parse(sessionStorage.getItem('user'));
      user.language = { audio: audioLanguage, written: item.isoCode };
      user.connectionTime = Date.now();
      sessionStorage.setItem('user', JSON.stringify(user));
    } else {
      const user = JSON.parse(localStorage.getItem('user'));
      user.language = { audio: audioLanguage, written: item.isoCode };
      user.connectionTime = Date.now();
      localStorage.setItem('user', JSON.stringify(user));
    }
    this.router.navigate(['translation']);
  }

  public showMainLanguages(): void {
    this.selectedCountriesData = this.selectedCountries.map((country) => VOCABULARY.find((i) => i.isoCode === country));
  }
  async audioDescription(item: Vocabulary) {
    const audioLanguage = item.audioCode ? item.audioCode : item.isoCode;
    const audio = await this.textToSpeechService.getSpeech(item.sentences.readedWelcome, audioLanguage);
    if (audio) {
      this.textToSpeechService.audioSpeech.play();
    }
  }

  public moreLanguage(): void {
    this.dialog
      .open(LanguagesComponent, { width: '900px', height: '900px' })
      .afterClosed()
      .subscribe((response) => {
        if (response === 'chosen') {
          this.router.navigate(['translation']);
        }
      });
  }
  @HostListener('window:beforeunload', ['$event'])
  public openPopUp(event): any {
    const confirmationMessage = 'Warning: Leaving this page will result in any unsaved data being lost. Are you sure you wish to continue?';
    (event || window.event).returnValue = confirmationMessage; // Gecko + IE 
    return confirmationMessage;
  }

  @HostListener('window:unload')
  public canDeactivate(): Observable<boolean> | boolean {
    this.deactivate();
    return true;
  }

  private deactivate() {
    if (this.isMultiDevices) {
      this.settingsService.reset();
      if (this.user.role === Role.GUEST) {
        const isEndClosed: boolean = this.endIdDialogRef === undefined;
        if (isEndClosed) {
          this.chatService.deleteMember(this.user.roomId, this.user.firstname, this.user.id);
        }
      } else {
        this.chatService.delete(this.user.roomId);
      }
    }
  }

  public isoCodeToFlag(isoCode: string) {
    return isoCode.split('-')[1].toLowerCase();
  }
  private endConversation(roomId: string) {
    this.chatService.getChatStatus(roomId).subscribe((active) => {
      if (active !== null && !active) {
        this.openModal(EndComponent, '300px', true);
      }
    });
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
