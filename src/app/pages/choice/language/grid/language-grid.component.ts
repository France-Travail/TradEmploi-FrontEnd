import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { VOCABULARY } from 'src/app/data/vocabulary';
import { ERROR_FUNC_TTS } from 'src/app/models/error/errorFunctionnal';
import { Vocabulary } from 'src/app/models/vocabulary';
import { SettingsService } from 'src/app/services/settings.service';
import { TextToSpeechService } from 'src/app/services/text-to-speech.service';
import { ToastService } from 'src/app/services/toast.service';
import { ENGLISH, FRENCH } from 'src/app/data/sentence';
import { Tooltip } from './../../../../models/vocabulary';
import { ClickInfo, TagService } from '../../../../lib/atinternet/_services/tag.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-language-grid',
  templateUrl: './language-grid.component.html',
  styleUrls: ['./language-grid.component.scss'],
})
export class LanguageGridComponent implements OnChanges {
  @Input() search: String;
  @Input() optionAll: boolean;
  @Input() optionList: boolean;
  @Input() isGuest: boolean;

  public countries: Vocabulary[] = [];
  public tooltip: Tooltip;
  public voiceTitle: string;

  private countriesSelected: string[] = ['en-GB', 'ar-XA', 'ps-AF', 'fa-AF', 'bn-BD', 'es-ES', 'de-DE', 'pt-PT', 'it-IT', 'zh-CN', 'ru-RU'];
  private audioClick: boolean = false;
  private audioEnabled = true;

  public countriesSort = [
    { value: ['langue', true], viewValue: 'Ordre alphabétique ascendant - Langue' },
    { value: ['langue', false], viewValue: 'Ordre alphabétique descendant - Langue' },
    { value: ['pays', true], viewValue: 'Ordre alphabétique ascendant - Pays' },
    { value: ['pays', false], viewValue: 'Ordre alphabétique descendant - Pays' },
  ];

  constructor(private textToSpeechService: TextToSpeechService, private toastService: ToastService, private settingsService: SettingsService, private router: Router, private tagService: TagService) {}

  ngOnChanges() {
    this.tooltip = this.isGuest ? ENGLISH.tooltip : FRENCH.tooltip;
    this.voiceTitle = this.isGuest ? ENGLISH.choice.voice : FRENCH.choice.voice;
    this.optionAll ? this.getCountriesAll() : this.getCountriesSelected();
    if (this.search && this.search != '') {
      const searchName = this.search.trim().toLowerCase();
      this.countries = this.countries.filter(
        (c) =>
          c.languageNameFr.toLowerCase().indexOf(searchName) === 0 ||
          c.countryNameFr.toLowerCase().indexOf(searchName) === 0 ||
          c.languageNameRaw.toLowerCase().indexOf(searchName) === 0 ||
          c.countryNameRaw.toLowerCase().indexOf(searchName) === 0
      );
    }
  }

  public getCountriesSelected() {
    this.countries = this.countriesSelected.map((country) => VOCABULARY.find((i) => i.isoCode === country));
  }

  public getCountriesAll() {
    this.countries = VOCABULARY.sort((a, b) => this.sortCountryNameFr(a.languageNameFr, b.languageNameFr));
  }

  public isoCodeToFlag(isoCode: string) {
    return isoCode.split('-')[1].toLowerCase();
  }

  public gridSortingHandler(sortType) {
    sortType[0] === 'pays' ? this.orderByCountryNameFr(sortType[1]) : this.orderByLanguage(sortType[1]);
  }

  private orderByCountryNameFr(asc: boolean) {
    this.countries.sort(function (a, b) {
      return asc ? a.countryNameFr.localeCompare(b.countryNameFr) : b.countryNameFr.localeCompare(a.countryNameFr);
    });
  }

  private orderByLanguage(asc: boolean) {
    this.countries.sort(function (a, b) {
      return asc ? a.languageNameFr.localeCompare(b.languageNameFr) : b.languageNameFr.localeCompare(a.languageNameFr);
    });
  }

  public audioDescription(item: Vocabulary) {
    this.audioClick = true;
    if (this.audioEnabled) {
      this.audioEnabled = false;
      const audioLanguage = item.audioCode ? item.audioCode : item.isoCode;
      this.textToSpeechService
        .getSpeech(item.sentences.readedWelcome, audioLanguage)
        .then((_) => {
          this.textToSpeechService.audioSpeech.play();
          this.textToSpeechService.audioSpeech = undefined;
          setTimeout(() => {
            this.audioEnabled = true;
          }, 2000);
        })
        .catch((_) => {
          this.toastService.showToast(ERROR_FUNC_TTS.description, 'toast-error');
          this.audioEnabled = true;
          this.textToSpeechService.audioSpeech = undefined;
        });
    }
  }

  public selectLanguage(event: any, item: Vocabulary): void {
    const clickData: ClickInfo = {
      elem: event.target,
      name: item.languageNameFr,
      chapter1: 'chap1',
      chapter2: 'chap2',
      chapter3: 'chap3',
      level2: '1',
      type: 'exit',
      event,
    };
    this.tagService.click(clickData);
    this.audioClick ? (this.audioClick = false) : this.goToTransation(item);
  }

  private goToTransation(item: Vocabulary) {
    const audioLanguage = item.audioCode ? item.audioCode : item.isoCode;
    this.settingsService.user.next({
      ...this.settingsService.user.value,
      language: { audio: audioLanguage, written: item.isoCode, languageName: item.languageNameFr },
      connectionTime: Date.now(),
    });
    this.isGuest ? this.onSessionStorage(audioLanguage, item.isoCode, item.languageNameFr) : this.onLocalStorage(audioLanguage, item.isoCode, item.languageNameFr);
    this.router.navigate(['translation']);
  }

  private onSessionStorage(audioLanguage: string, isoCode: string, languageNameFr: string) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    user.language = { audio: audioLanguage, written: isoCode, languageName: languageNameFr };
    user.connectionTime = Date.now();
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  private onLocalStorage(audioLanguage: string, isoCode: string, languageNameFr: string) {
    const user = JSON.parse(localStorage.getItem('user'));
    user.language = { audio: audioLanguage, written: isoCode, languageName: languageNameFr };
    user.connectionTime = Date.now();
    localStorage.setItem('user', JSON.stringify(user));
  }

  private sortCountryNameFr(a: String, b: String) {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
  }
}
