import { EndComponent } from './../translation/dialogs/end/end.component';
import { Component, AfterContentInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { VOCABULARY } from 'src/app/data/vocabulary';
import { LanguagesComponent } from './dialog/languages/languages.component';
import { SettingsService } from 'src/app/services/settings.service';
import { TextToSpeechService } from 'src/app/services/text-to-speech.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { ChatService } from 'src/app/services/chat.service';
import { Role } from 'src/app/models/role';
import { ComponentCanDeactivate } from 'src/app/guards/pending-changes.guard';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss'],
})
export class ChoiceComponent implements AfterContentInit, ComponentCanDeactivate {
  public selectedCountriesData = [];
  public selectedCountries: string[] = ['en-GB', 'ar-XA', 'ps-AF', 'fa-IR', 'bn-BD', 'es-ES', 'de-DE', 'pt-PT', 'it-IT', 'zh-ZH', 'ru-RU'];
  public toolTips: string[] = ['Autres langues'];
  public audioSpeech: HTMLAudioElement;
  public otherLanguageFr: string = 'AUTRES LANGUES';
  public otherLanguageEn: string = 'OTHER LANGUAGES';

  constructor(
    private textToSpeechService: TextToSpeechService,
    private router: Router,
    private settingsService: SettingsService,
    public dialog: MatDialog,
    private navService: NavbarService,
    private chatService: ChatService
  ) {
    this.navService.handleTabsChoice();
    this.settingsService.user.subscribe((user) => {
      if (user != null) {
        const isMultiDevices = user.roomId !== undefined;
        if (isMultiDevices && user.role === Role.GUEST) {
          this.endConversation(user.roomId);
        }
      }
    });
  }

  ngAfterContentInit(): void {
    this.showMainLanguages();
    this.navService.show();
  }

  public selectLanguage(audio: string, written: string, flag: string): void {
    this.settingsService.user.next({ ...this.settingsService.user.value, language: { audio: audio, written: written } });
    this.settingsService.user.next({ ...this.settingsService.user.value, flag: flag });
    this.router.navigate(['translation']);
  }

  public showMainLanguages(): void {
    this.selectedCountriesData = this.selectedCountries.map((country) => VOCABULARY.find((i) => i.isoCode === country));
  }
  async audioDescription(message: string, lang: string) {
    const audio = await this.textToSpeechService.getSpeech(message, lang);
    if (audio) {
      this.textToSpeechService.audioSpeech.play();
    }
  }

  public moreLanguage(): void {
    this.dialog
      .open(LanguagesComponent, { width: '900px', height: '900px' })
      .afterClosed()
      .subscribe((response) => {
        if (response === 'chosen') {
          this.router.navigate(['translation']);
        }
      });
  }

  @HostListener('window:unload')
  public canDeactivate(): Observable<boolean> | boolean {
    const user = this.settingsService.user.value;
    const isMultiDevices = user.roomId !== undefined;
    if (isMultiDevices) {
      this.settingsService.reset();
      if (user.role === Role.GUEST) {
        this.chatService.deleteMember(user.roomId, user.firstname, user.id);
      } else {
        this.chatService.delete(user.roomId);
      }
    }
    return true;
  }

  private endConversation(roomId: string) {
    this.chatService.getChatStatus(roomId).subscribe((active) => {
      if (active !== null && !active) {
        this.dialog.open(EndComponent, {
          width: '800px',
          height: '300px',
          panelClass: 'customDialog',
          disableClose: true,
        });
      }
    });
  }
}
