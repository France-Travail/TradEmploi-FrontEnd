import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tooltip, Vocabulary } from './../../../../models/vocabulary';
import { Observable } from 'rxjs';
import { Language } from '../../../../models/db/language';
import { AngularFirestore } from '@angular/fire/firestore';
import { VOCABULARY } from '../../../../data/vocabulary';
import { ToastService } from '../../../../services/toast.service';
import { SettingsService } from '../../../../services/settings.service';
import { ENGLISH, FRENCH } from '../../../../data/sentence';
import { ERROR_FUNC_TTS } from '../../../../models/error/errorFunctionnal';
import { TextToSpeechService } from '../../../../services/text-to-speech.service';
import { LoaderComponent } from '../../../settings/loader/loader.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-language-grid',
  templateUrl: './language-grid.component.html',
  styleUrls: ['./language-grid.component.scss'],
})
export class LanguageGridComponent implements OnChanges, OnInit {
  @Input() search: string;
  @Input() optionAll: boolean;
  @Input() optionList: boolean;
  @Input() isGuest: boolean;

  public countries: Vocabulary[] = [];
  public tooltip: Tooltip;
  public voiceTitle: string;

  private audioClick = false;
  private audioEnabled = true;
  private readonly selectedCountries: Vocabulary[] = [];
  public mapLanguages: Map<string, Language> = new Map();

  public countriesSort = [
    { value: ['langue', true], viewValue: 'Langue (asc)' },
    { value: ['langue', false], viewValue: 'Langue (desc)' },
    { value: ['pays', true], viewValue: 'Pays (asc)' },
    { value: ['pays', false], viewValue: 'Pays (desc)' },
  ];
  public styles = { margin: '0px', padding: '0px', fontSize: '20px' };

  constructor(
    private readonly textToSpeechService: TextToSpeechService,
    private readonly toastService: ToastService,
    private readonly settingsService: SettingsService,
    private readonly db: AngularFirestore,
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) {
    const result = this.db.collection(`languages`, (ref) => ref.orderBy('occurrences', 'desc')).valueChanges() as Observable<Language[]>;
    result.subscribe((languages) =>
      languages.forEach((language) => {
        this.selectedCountries.push(...VOCABULARY.filter((i) => this.isValidIsoCode(i, language)));
        this.mapLanguages.set(language.isoCode, language);
      })
    );
  }

  private isValidIsoCode(i: Vocabulary, language: Language) {
    return i.isoCode === language.isoCode && i.isoCode !== 'fr-FR' && i.isoCode !== 'fr-CA';
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
    this.countries = [];
    const vocabulary = [...VOCABULARY].filter((language) => language.isoCode !== 'fr-FR' && language.isoCode !== 'fr-CA');
    this.countries.push(...vocabulary);

    this.countries.sort((a, b) => a.languageNameFr.localeCompare(b.languageNameFr));
  }

  public isoCodeToFlag(isoCode: string) {
    return isoCode.split('-')[1].toLowerCase();
  }

  public gridSortingHandler(sortType) {
    sortType[0] === 'pays' ? this.orderByCountryNameFr(sortType[1]) : this.orderByLanguage(sortType[1]);
  }

  private orderByCountryNameFr(asc: boolean) {
    this.countries.sort((a, b) => (asc ? a.countryNameFr.localeCompare(b.countryNameFr) : b.countryNameFr.localeCompare(a.countryNameFr)));
  }

  private orderByLanguage(asc: boolean) {
    this.countries.sort((a, b) => (asc ? a.languageNameFr.localeCompare(b.languageNameFr) : b.languageNameFr.localeCompare(a.languageNameFr)));
  }

  public audioDescription(item: Vocabulary) {
    this.audioClick = true;
    if (this.audioEnabled) {
      this.audioEnabled = false;
      const audioLanguage = item.audioCode ? item.audioCode : item.isoCode;
      const loaderDialog = this.dialog.open(LoaderComponent, { panelClass: 'loader', disableClose: true });

      this.textToSpeechService
        .getSpeech(item.sentences.readedWelcome, audioLanguage)
        .then((_) => {
          this.textToSpeechService.audioSpeech.play();
          this.textToSpeechService.audioSpeech = undefined;
          setTimeout(() => {
            this.audioEnabled = true;
          }, 2000);
          loaderDialog.close();
        })
        .catch((_) => {
          this.toastService.showToast(ERROR_FUNC_TTS.description, 'toast-error');
          this.audioEnabled = true;
          this.textToSpeechService.audioSpeech = undefined;
          loaderDialog.close();
        });
    }
  }

  public selectLanguage(event: any, item: Vocabulary): void {
    if (this.audioClick) {
      this.audioClick = false;
    } else {
      this.goToTransation(item);
    }
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
}
