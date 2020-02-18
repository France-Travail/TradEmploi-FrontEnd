// Angular
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

// Services
import { VoicesService } from 'src/app/services/voices.service';
import { TranslateService } from 'src/app/services/translate.service';
import { SettingsService } from 'src/app/services/settings.service';

// Data
import { COUNTRIES } from 'src/app/data/countries';

// Models
import { Voice } from 'src/app/models/voice';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent {
  private voices: Voice[];

  public list: { country: string; flag: string; language: string }[] = [];

  constructor(public dialogRef: MatDialogRef<LanguagesComponent>, private translateService: TranslateService, private voicesService: VoicesService, private settingsService: SettingsService) {
    this.voices = this.voicesService.voicesList;

    for (const voice of COUNTRIES) {
      let flag = voice.code.audioLanguage.split('-')[1].toLowerCase();
      flag = flag === 'zh' ? 'cn' : flag === 'hant' ? 'hk' : flag === 'qi' ? 'iq' : flag;

      this.list.push({
        country: voice.country,
        language: voice.language,
        flag
      });
    }
  }

  /**
   * Method called when user close the modal
   */
  public close(): void {
    this.dialogRef.close('closed');
  }

  /**
   * Set the language for services and close the modal
   */
  public chooseLanguage(country: string) {
    for (const voice of COUNTRIES) {
      if (voice.country === country) {
        this.voicesService.guest = voice.code;
        this.translateService.guest = voice.code;
        this.settingsService.guest.next({ ...this.settingsService.guest.value, language: voice.code.writtenLanguage });
      }
    }
    this.dialogRef.close('chosen');
  }
}
