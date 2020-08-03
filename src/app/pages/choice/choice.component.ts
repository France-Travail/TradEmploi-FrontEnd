// Angular
import { Component, AfterContentInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { VOCABULARY } from 'src/app/data/vocabulary';
import { LanguagesComponent } from './dialog/languages/languages.component';
import { HistoryService } from 'src/app/services/history.service';
import { SettingsService } from 'src/app/services/settings.service';
import { TextToSpeechService } from 'src/app/services/text-to-speech.service';
import { Role } from 'src/app/models/role';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss'],
})
export class ChoiceComponent implements AfterContentInit {
  public selectedCountriesData = [];
  public selectedCountries: string[] = ['en-GB', 'ar-XA', 'ps-AF', 'fa-IR', 'bn-BD', 'es-ES', 'de-DE', 'pt-PT', 'it-IT', 'zh-ZH', 'ru-RU'];
  public toolTips: string[] = ['Autres langues'];
  public audioSpeech: HTMLAudioElement;
  public otherLanguageFr: string = 'AUTRES LANGUES';
  public otherLanguageEn: string = 'OTHER LANGUAGES';

  constructor(private textToSpeechService: TextToSpeechService, private historyService: HistoryService, private router: Router, private settingsService: SettingsService, public dialog: MatDialog) {
    this.settingsService.user.subscribe((user) => {
      if (user !== null) {
        this.setNavbar(user.role === Role.ADMIN);
      }
    });
  }

    this.settingsService.getTarget().subscribe((user) => {
      this.isGuest = !this.isGuest ? user.firstname !== null && user.firstname !== '' : this.isGuest = this.isGuest;
      this.isMultiDevices = this.isMultiDevices ? user.roomId !== null && user.roomId !== '' : this.isMultiDevices = this.isMultiDevices;
      // this.isMultiDevices = user.roomId != null && user.roomId != '';
      // this.isGuest = user.firstname != null && user.firstname != '';
      // console.log('firstname (choice) ', user.firstname)
      console.log('devices & guest (choice) : ', this.isMultiDevices, this.isGuest)
    });
  }

  ngOnInit() {
    this.navService.show();
    this.navService.handleTabs(window.location.pathname, this.isGuest);
  }

  ngAfterContentInit(): void {
    this.showMainLanguages();
  }

  selectLanguage(audio: string, written: string): void {
    this.settingsService.user.next({ ...this.settingsService.user.value, language: { audio: audio, written: written } });
    this.router.navigate(['translation']);
  }
  showMainLanguages(): void {
    this.selectedCountriesData = this.selectedCountries.map((country) => VOCABULARY.find((i) => i.isoCode === country));
  }
  async audioDescription(message: string, lang: string) {
    const audio = await this.textToSpeechService.getSpeech(message, lang);
    if (audio) {
      this.textToSpeechService.audioSpeech.play();
    }
  }

  moreLanguage(): void {
    this.dialog
      .open(LanguagesComponent, { width: '900px', height: '900px' })
      .afterClosed()
      .subscribe((response) => {
        if (response === 'chosen') {
          this.router.navigate(['translation']);
        }
      });
  }
}
