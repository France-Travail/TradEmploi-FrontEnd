// Angular
import { Component, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { TranslateService } from 'src/app/services/translate.service';
import { VOCABULARY } from 'src/app/data/vocabulary';
import { LanguagesComponent } from './dialog/languages/languages.component';
import { HistoryService } from 'src/app/services/history.service';
import { SettingsService } from 'src/app/services/settings.service';
import { TextToSpeechService } from 'src/app/services/text-to-speech.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarService } from 'src/app/services/navbar.service';
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

  constructor(
    private translateService: TranslateService,
    private textToSpeechService: TextToSpeechService,
    private historyService: HistoryService,
    private settingsService: SettingsService,
    private router: Router,
    public dialog: MatDialog,
    public nav: NavbarService
  ) {
    if (this.historyService.conversation === undefined) {
      this.router.navigate(['start']);
    }
  }

  ngOnInit() {
    this.nav.show();
    this.nav.hideItem();
  }

  ngAfterContentInit(): void {
    this.showMainLanguages();
  }

  setNavbar(isAdmin: boolean): void {
    // this.navBarItems = [
    //   {
    //     icon: 'assets/icons/icon-settings-black.svg',
    //     infoTitle: 'PARAMÈTRES',
    //     link: 'settings/choice',
    //     isDisplayed: isAdmin,
    //   },
    //   {
    //     icon: 'assets/icons/icon-logout.svg',
    //     infoTitle: 'DECONNEXION',
    //     link: 'logout',
    //     isDisplayed: true,
    //   },
    // ];
  }

  handleAction(event: any): void {
    event.call(this);
  }

  selectLanguage(audioLanguage: string, writtenLanguage: string): void {
    this.translateService.guest.audioLanguage = audioLanguage;
    this.translateService.guest.writtenLanguage = writtenLanguage;
    this.settingsService.guest.next({ ...this.settingsService.guest.value, language: writtenLanguage });
    this.router.navigate(['translation']);
  }
  showMainLanguages(): void {
    this.selectedCountriesData = this.selectedCountries.map((country) => VOCABULARY.find((i) => i.isoCode === country));
  }

  async audioDescription(message: string, lang: string) {
    const audio = await this.textToSpeechService.getSpeech(message, lang, 'MALE');
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
