import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { VOCABULARY, VOCABULARY_DEFAULT } from 'src/app/data/vocabulary';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-translation-title',
  templateUrl: './translation-title.component.html',
  styleUrls: ['./translation-title.component.scss'],
})
export class TranslationTitleComponent implements OnInit {
  @Output() finish: EventEmitter<null> = new EventEmitter<null>();

  public title: { raw: string; french: string };
  public languages: { raw: string; french: string };
  public isGuest: boolean = false;

  constructor(private settingsService: SettingsService, public router: Router) {
    this.settingsService.user.subscribe((user) => {
      if (user != null) {
        this.isGuest = user.role == Role.GUEST;
      }
    });
  }

  ngOnInit(): void {
    let guest = VOCABULARY.find((item) => item.isoCode === this.settingsService.user.value.language.written);
    if (guest === undefined) {
      guest = VOCABULARY_DEFAULT;
    }
    const advisorSentences = VOCABULARY.find((item) => item.isoCode === this.settingsService.defaultLanguage.written).sentences;

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
