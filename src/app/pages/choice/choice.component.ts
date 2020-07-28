// Angular
import { Component, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { VOCABULARY } from 'src/app/data/vocabulary';
import { LanguagesComponent } from './dialog/languages/languages.component';
import { HistoryService } from 'src/app/services/history.service';
import { SettingsService } from 'src/app/services/settings.service';
import { TextToSpeechService } from 'src/app/services/text-to-speech.service';
import { NavbarItem } from 'src/app/models/navbar-item';
import { Role } from 'src/app/models/role';
@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss'],
})
export class ChoiceComponent implements AfterContentInit {
  public navBarItems: NavbarItem[] = [];
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

  ngAfterContentInit(): void {
    this.showMainLanguages();
  }

  setNavbar(isAdmin: boolean): void {
    this.navBarItems = [
      {
        icon: 'assets/icons/icon-settings-black.svg',
        infoTitle: 'PARAMÈTRES',
        link: 'settings/choice',
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

  handleAction(event: any): void {
    event.call(this);
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
