// Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
// Services
import { TranslateService } from 'src/app/services/translate.service';
import { COUNTRIES } from 'src/app/data/countries';
import { WELCOME } from 'src/app/data/welcomeSentences';
// Dialogs
import { LanguagesComponent, Countries } from './dialog/languages/languages.component';
import { HistoryService } from 'src/app/services/history.service';
import { SettingsService } from 'src/app/services/settings.service';
import { TextToSpeechService } from 'src/app/services/text-to-speech.service';
import { AudioRecordingService } from 'src/app/services/audio-recording.service';

export interface mainLanguages {
  country: Countries;
  hello: string;
}
export interface welcomeStruct {
  country: string;
  hello: string;
}
@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})
export class ChoiceComponent implements OnInit {
  ngOnInit(): void {
    this.selectMainLanguages();
  }

  public mainLanguages: mainLanguages[] = [];
  public countries: Countries[] = COUNTRIES;
  public welcome: welcomeStruct[] = WELCOME;
  public selectedLanguages: string[] = ['Arabe', 'Pachto', 'Anglais', 'Tamoul', 'Allemand', 'Ouzbek', 'Ourdou', 'Mandarin', 'Espagnol', 'Amharique', 'Népalais', 'Bengali', 'Portugais', 'Russe'];
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
    public dialog: MatDialog
  ) {
    if (this.historyService.conversation === undefined) {
      this.router.navigate(['start']);
    }
  }

  /**
   * Initialyze the selected language
   */

  selectLanguage(audioLanguage: string, writtenLanguage: string): void {
    this.translateService.guest.audioLanguage = audioLanguage;
    this.translateService.guest.writtenLanguage = writtenLanguage;
    this.settingsService.guest.next({ ...this.settingsService.guest.value, language: writtenLanguage });
    this.router.navigate(['translation']);
  }

  selectMainLanguages(): void {
    this.selectedLanguages.forEach(element => {
      let country = this.countries.filter(country => country.LanguageFr === element)[0];
      let traduction = country.traduction;
      let sentence: welcomeStruct = this.welcome.filter(c => c.country === traduction)[0];
      this.mainLanguages.push({
        country: country,
        hello: sentence.hello
      });
    });
  }

  async audioDescription(message: string, lang: string) {
    await this.textToSpeechService.getSpeech(message, lang, 'advisor', false);
    this.textToSpeechService.audioSpeech.play();
  }
  /**
   * Open the modal that displays all the available languages
   */
  moreLanguage(): void {
    this.selectMainLanguages();
    this.dialog
      .open(LanguagesComponent, { width: '900px', height: '900px' })
      .afterClosed()
      .subscribe(response => {
        if (response === 'chosen') {
          this.router.navigate(['translation']);
        }
      });
  }
  setBackgroundColor(item: any): void {
    item.setAttribute('style', 'background-color:#135dfe;');
  }
  removebackgroundColor(item: any): void {
    item.removeAttribute('style');
  }
}
