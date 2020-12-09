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
import { Vocabulary } from 'src/app/models/vocabulary';
import { User } from 'src/app/models/user';
import { ToastService } from 'src/app/services/toast.service';
import { ERROR_FUNC_TTS } from 'src/app/models/error/errorFunctionnal';

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
  public speakEnabled = true;

  private endIdDialogRef: MatDialogRef<any, any>;
  private user: User;

  constructor(
    private textToSpeechService: TextToSpeechService,
    private router: Router,
    private settingsService: SettingsService,
    public dialog: MatDialog,
    private navService: NavbarService,
    private chatService: ChatService,
    private toastService: ToastService
  ) {
    this.navService.handleTabsChoice();
    this.settingsService.user.subscribe((user) => {
      if (user != null) {
        if (user.isMultiDevices && user.role === Role.GUEST) {
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
    this.settingsService.user.next({ ...this.settingsService.user.value, language: { audio: audioLanguage, written: item.isoCode, languageName: item.languageNameFr }, connectionTime: Date.now() });
    if (this.user.role === Role.GUEST) {
      const user = JSON.parse(sessionStorage.getItem('user'));
      user.language = { audio: audioLanguage, written: item.isoCode, languageName: item.languageNameFr };
      user.connectionTime = Date.now();
      sessionStorage.setItem('user', JSON.stringify(user));
    } else {
      const user = JSON.parse(localStorage.getItem('user'));
      user.language = { audio: audioLanguage, written: item.isoCode, languageName: item.languageNameFr };
      user.connectionTime = Date.now();
      localStorage.setItem('user', JSON.stringify(user));
    }
    this.router.navigate(['translation']);
  }

  public showMainLanguages(): void {
    this.selectedCountriesData = this.selectedCountries.map((country) => VOCABULARY.find((i) => i.isoCode === country));
  }

  public audioDescription(item: Vocabulary) {
    this.speakEnabled = false;
    const audioLanguage = item.audioCode ? item.audioCode : item.isoCode;
    this.textToSpeechService.getSpeech(item.sentences.readedWelcome, audioLanguage).then(_ => {
      this.textToSpeechService.audioSpeech.play();
      setTimeout(() => {
        this.speakEnabled = true;
      }, 2000);
    }).catch(_ => {
      this.toastService.showToast(ERROR_FUNC_TTS.description, 'toast-error');
      this.speakEnabled = true;
    });
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

  private deactivateMulti() {
    if (this.user.role === Role.GUEST) {
      const isEndClosed: boolean = this.endIdDialogRef === undefined;
      if (isEndClosed) {
        this.chatService.notifyAdvisor(this.user.roomId, this.user.firstname);
      }
    } else {
      this.chatService.updateChatStatus(this.user.roomId, false);
    }
  }

  private deactivateMono() {
    this.chatService.initChatMono(this.user.roomId, this.user.role);
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
