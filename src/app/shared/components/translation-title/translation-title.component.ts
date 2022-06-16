import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../../../services/settings.service';
import { Role } from '../../../models/role';
import { VOCABULARY_GCP, VOCABULARY_DEFAULT } from '../../../data/vocabulary-gcp';

@Component({
  selector: 'app-translation-title',
  templateUrl: './translation-title.component.html',
  styleUrls: ['./translation-title.component.scss'],
})
export class TranslationTitleComponent implements OnInit {
  @Output() finish: EventEmitter<null> = new EventEmitter<null>();

  public title: { raw: string; french: string };
  public languages: { raw: string; french: string };
  public isGuest = false;

  constructor(private readonly settingsService: SettingsService, private readonly router: Router) {
    this.settingsService.user.subscribe((user) => {
      if (user != null) {
        this.isGuest = user.role === Role.GUEST;
      }
    });
  }

  ngOnInit(): void {
    let guest = VOCABULARY_GCP.find((item) => item.isoCode === this.settingsService.user.value.language.written);
    if (guest === undefined) {
      guest = VOCABULARY_DEFAULT;
    }
    const advisorSentences = VOCABULARY_GCP.find((item) => item.isoCode === this.settingsService.defaultLanguage.written).sentences;

    this.title = {
      raw: guest.sentences.applicationName,
      french: advisorSentences.applicationName,
    };
    if (guest.languageNameRaw !== undefined) {
      this.languages = {
        raw: guest.languageNameRaw,
        french: guest.languageNameFr,
      };
    }
  }

  public over(): void {
    this.finish.emit();
  }
}
