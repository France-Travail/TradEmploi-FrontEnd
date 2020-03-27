// Angular
import { Component, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
// Services
import { TranslateService } from 'src/app/services/translate.service';

import { VOCABULARY_V2 } from 'src/app/data/vocabulary';
// Dialogs
import { LanguagesComponent, Countries } from './dialog/languages/languages.component';
import { HistoryService } from 'src/app/services/history.service';
import { SettingsService } from 'src/app/services/settings.service';
import { TextToSpeechService } from 'src/app/services/text-to-speech.service';
//Models
import { NavbarItem } from 'src/app/models/navbar-item';
import { Vocabulary } from 'src/app/models/vocabulary';

interface selectedCountry {
  isoCode: string;
  countryName: string;
  countryNameFR: string;
  flag: string;
  displayedWelcome: string;
  readedWelcome: string;
  buttonSentence: string;
  audioSupported: string;
  buttonSentenceFR: string;
}
@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})
export class ChoiceComponent implements AfterContentInit {
  ngAfterContentInit(): void {
    this.showMainLanguages();
    this.setNavbar();
  }
  public navBarItems: NavbarItem[] = [];
  public vocabulary: Vocabulary[] = VOCABULARY_V2;
  public selectedCountriesData: selectedCountry[] = [];
  public selectedCountries: string[] = [
    'en-GB',
    'ar-XA',
    'ps-AF',
    'fa-IR',
    'bn-BD',
    'es-ES',
    'de-DE',
    'pt-PT',
    'it-IT',
    'zh-ZH',
    'ru-RU',
    'ro-RO'

    // 'mn-MN',
    // 'ne-NP',
    // 'uz-UZ',
    // 'ro-RO',
    // 'so-SO',
    // 'vi-VN'
  ];
  public toolTips: string[] = ['Autres langues'];
  public audioSpeech: HTMLAudioElement;
  public otherLanguageFr: string = 'AUTRES LANGUES';
  public otherLanguageEn: string = 'OTHER LANGUAGES';
  public listenIconSrc: string = 'assets/icons/icon-listen-white.svg';
  constructor(
    private translateService: TranslateService,
    private textToSpeechService: TextToSpeechService,
    private historyService: HistoryService,
    private settingsService: SettingsService,
    private router: Router,
    public dialog: MatDialog
  ) {
    if (this.historyService.conversation === undefined) {
      this.router.navigate(['start']);
    }
  }
  /*
   * Set Navbar items
   */
  setNavbar(): void {
    this.navBarItems = [
      {
        icon: 'assets/icons/icon-settings-black.svg',
        infoTitle: 'PARAMÈTRES',
        link: 'settings/translation',
        isDisplayed: true
      }
    ];
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
    this.selectedCountries.forEach(country => {
      let sentences = this.vocabulary.find(item => item.isoCode === country).sentences;
      this.selectedCountriesData.push({
        displayedWelcome: sentences.find(s => s.key === 'displayed-welcome').value,
        readedWelcome: sentences.find(s => s.key === 'readed-welcome').value,
        flag: sentences.find(s => s.key === 'flag').value,
        isoCode: country,
        countryName: sentences.find(s => s.key === 'country-name-raw').value,
        countryNameFR: sentences.find(s => s.key === 'country-name-fr').value,
        buttonSentence: sentences.find(s => s.key === 'button-sentence').value,
        buttonSentenceFR: sentences.find(s => s.key === 'button-sentence-fr').value,
        audioSupported: sentences.find(s => s.key === 'audioSupported')?.value
      });
    });
  }
  async audioDescription(message: string, lang: string) {
    let audio = await this.textToSpeechService.getSpeech(message, lang, 'MALE');
    if (audio) {
      this.textToSpeechService.audioSpeech.play();
    }
  }
  /**
   * Open the modal that displays all the available languages
   */
  moreLanguage(): void {
    this.dialog
      .open(LanguagesComponent, { width: '900px', height: '900px' })
      .afterClosed()
      .subscribe(response => {
        if (response === 'chosen') {
          this.router.navigate(['translation']);
        }
      });
  }
}
