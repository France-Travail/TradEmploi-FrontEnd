// Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

// Services
import { TranslateService } from 'src/app/services/translate.service';

// Dialogs
import { LanguagesComponent } from './dialog/languages/languages.component';
import { HistoryService } from 'src/app/services/history.service';
import { SettingsService } from 'src/app/services/settings.service';

// Models
import { Lang } from 'src/app/models/lang';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})
export class ChoiceComponent {
  /**
   * Main languages list
   */
  public words: { displayedValue: string; value: Lang; padding: number }[] = [
    { displayedValue: 'سلام', value: { audioLanguage: 'ar-DZ', writtenLanguage: 'ar-DZ' }, padding: 50 }, // Arabe, Pashto, Dari
    { displayedValue: 'Hello', value: { audioLanguage: 'en-GB', writtenLanguage: 'en-GB' }, padding: 0 }, // Anglais
    { displayedValue: 'தமிழ்', value: { audioLanguage: 'ta-IN', writtenLanguage: 'ta-IN' }, padding: 22 }, // Tamoul
    { displayedValue: 'Hallo', value: { audioLanguage: 'de-DE', writtenLanguage: 'de-DE' }, padding: 10 }, // Allemand
    { displayedValue: 'Salom', value: { audioLanguage: 'ru-RU', writtenLanguage: 'uz-UZ' }, padding: 60 }, // Uzbek
    { displayedValue: 'ہیلو', value: { audioLanguage: 'ur-PK', writtenLanguage: 'ur-PK' }, padding: 20 }, // Urdu
    { displayedValue: '你好', value: { audioLanguage: 'zh-ZH', writtenLanguage: 'zh-ZH' }, padding: 0 }, // Chinois, Mandarin
    { displayedValue: 'Buenos dias', value: { audioLanguage: 'es-ES', writtenLanguage: 'es-ES' }, padding: 30 }, // Espagnol
    { displayedValue: 'ጤናይስጥልኝ', value: { audioLanguage: 'am-ET', writtenLanguage: 'am-ET' }, padding: 30 }, // Amharic
    { displayedValue: 'नमस्कार', value: { audioLanguage: 'ne-NP', writtenLanguage: 'ne-NP' }, padding: 0 }, // Nepali
    { displayedValue: 'হ্যালো', value: { audioLanguage: 'bn-IN', writtenLanguage: 'bn-IN' }, padding: 20 }, // Bengali
    { displayedValue: 'Bonjour', value: { audioLanguage: 'fr-FR', writtenLanguage: 'fr-FR' }, padding: 0 }, // Français
    { displayedValue: 'Olá', value: { audioLanguage: 'pt-PT', writtenLanguage: 'pt-PT' }, padding: 0 }, // Portugais
    { displayedValue: 'привет', value: { audioLanguage: 'ru-RU', writtenLanguage: 'ru-RU' }, padding: 20 } // Russe
  ];

  constructor(private translateService: TranslateService, private historyService: HistoryService, private settingsService: SettingsService, private router: Router, public dialog: MatDialog) {
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
    this.settingsService.guest.language = writtenLanguage;
    this.router.navigate(['translation']);
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
