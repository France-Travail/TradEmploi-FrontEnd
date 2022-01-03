import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tooltip, Vocabulary } from './../../../../models/vocabulary';
import { Observable } from 'rxjs';
import { Language } from '../../../../models/db/language';
import { AngularFirestore } from '@angular/fire/firestore';
import { VOCABULARY_AZURE } from '../../../../data/vocabulary-microsoft-azure';
import { environment } from '../../../../../environments/environment';
import { TextToSpeechService } from '../../../../services/text-to-speech.service';
import { ToastService } from '../../../../services/toast.service';
import { SettingsService } from '../../../../services/settings.service';
import { VOCABULARY } from '../../../../data/vocabulary';
import { ENGLISH, FRENCH } from '../../../../data/sentence';
import { ERROR_FUNC_TTS } from '../../../../models/error/errorFunctionnal';


@Component({
  selector: 'app-language-grid',
  templateUrl: './language-grid.component.html',
  styleUrls: ['./language-grid.component.scss']
})
export class LanguageGridComponent implements OnChanges, OnInit {
  @Input() search: string;
  @Input() optionAll: boolean;
  @Input() optionList: boolean;
  @Input() isGuest: boolean;

  public countries: Vocabulary[] = [];
  public tooltip: Tooltip;
  public voiceTitle: string;

  private audioClick: boolean = false;
  private audioEnabled = true;
  private selectedCountries: Vocabulary[] = [];
  public mapLanguages: Map<string, Language> = new Map();

  public countriesSort = [
    { value: ['langue', true], viewValue: 'Langue (asc)' },
    { value: ['langue', false], viewValue: 'Langue (desc)' },
    { value: ['pays', true], viewValue: 'Pays (asc)' },
    { value: ['pays', false], viewValue: 'Pays (desc)' }
  ];
  public styles = { margin: '0px', padding: '0px', fontSize: '20px' };
  private vocabulary: Vocabulary[];


  constructor(private readonly textToSpeechService: TextToSpeechService,
              private readonly toastService: ToastService,
              private readonly settingsService: SettingsService,
              private readonly db: AngularFirestore, private readonly router: Router) {
    const result = this.db.collection(`languages`, ref => ref.orderBy('occurrences', 'desc')).valueChanges() as Observable<Language[]>;
    result.subscribe(languages => languages.forEach(language => {
      if (environment.microsoftSpeechConfig.enabled){
        this.vocabulary = VOCABULARY_AZURE;
      }else{
        this.vocabulary = VOCABULARY;
      }
      this.selectedCountries.push(...this.vocabulary.filter((i) => i.isoCode === language.isoCode && i.isoCode !== 'fr-FR'));
      this.mapLanguages.set(language.isoCode, language);
    }));

  }

  ngOnInit() {
    if (this.settingsService.isMobile) {
      this.styles = { margin: '0px', padding: '0px', fontSize: '10px' };
    }
  }

  ngOnChanges() {
    this.tooltip = this.isGuest ? ENGLISH.tooltip : FRENCH.tooltip;
    this.voiceTitle = this.isGuest ? ENGLISH.choice.voice : FRENCH.choice.voice;
    this.optionAll ? this.getCountriesAll() : this.setCountriesSelected();
    if (this.search && this.search !== '') {
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

  public setCountriesSelected() {
    this.countries = this.selectedCountries;
  }

  public getCountriesAll() {
      this.countries = [...this.vocabulary].sort((a, b) => this.sortCountryNameFr(a.languageNameFr, b.languageNameFr));
  }

  public isoCodeToFlag(isoCode: string) {
    return isoCode.split('-')[1].toLowerCase();
  }

  public gridSortingHandler(sortType) {
    sortType[0] === 'pays' ? this.orderByCountryNameFr(sortType[1]) : this.orderByLanguage(sortType[1]);
  }

  private orderByCountryNameFr(asc: boolean) {
    this.countries.sort((a, b) => asc ? a.countryNameFr.localeCompare(b.countryNameFr) : b.countryNameFr.localeCompare(a.countryNameFr));
  }

  private orderByLanguage(asc: boolean) {
    this.countries.sort((a, b) => asc ? a.languageNameFr.localeCompare(b.languageNameFr) : b.languageNameFr.localeCompare(a.languageNameFr));
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
    this.audioClick ? (this.audioClick = false) : this.goToTransation(item);
  }

  private goToTransation(item: Vocabulary) {
    const audioLanguage = item.audioCode ? item.audioCode : item.isoCode;
    this.settingsService.user.next({
      ...this.settingsService.user.value,
      language: { audio: audioLanguage, written: item.isoCode, languageName: item.languageNameFr },
      connectionTime: Date.now()
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

  private sortCountryNameFr(a: string, b: string) {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
  }
}
