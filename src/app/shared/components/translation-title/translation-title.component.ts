import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { VOCABULARY_V2 } from 'src/app/data/vocabulary';
import { Router } from '@angular/router';

@Component({
  selector: 'app-translation-title',
  templateUrl: './translation-title.component.html',
  styleUrls: ['./translation-title.component.scss']
})
export class TranslationTitleComponent implements OnInit {
  @Output() finish: EventEmitter<null> = new EventEmitter<null>();

  public title: { raw: string; french: string };
  public languages: { raw: string; french: string };

  constructor(private settingsService: SettingsService, public router: Router) {}

  ngOnInit(): void {
    const advisor = VOCABULARY_V2.find(item => item.isoCode === this.settingsService.advisor.language).sentences;
    const guest = VOCABULARY_V2.find(item => item.isoCode === this.settingsService.guest.value.language).sentences;

    this.title = {
      raw: guest.find(s => s.key === 'application-name').value,
      french: advisor.find(s => s.key === 'application-name').value,
    };

    this.languages = {
      raw: guest.find(s => s.key === 'language-name-raw').value,
      french: guest.find(s => s.key === 'language-name-fr').value,
    };

  }

  public over(): void {
    this.finish.emit();
  }
}
