import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { COUNTRIES } from 'src/app/data/countries';
import { VOCABULARY_V2 } from 'src/app/data/vocabulary';
import { TranslateService } from 'src/app/services/translate.service';
import { SettingsService } from 'src/app/services/settings.service';
import { PermissionsService } from 'src/app/services/permissions.service';
import { ToastService } from 'src/app/services/toast.service';
import { AudioRecordingService } from 'src/app/services/audio-recording.service';
import { SpeechRecognitionService } from 'src/app/services/speech-recognition.service';

export interface Countries {
  country: string;
  traduction: string;
  flag: string;
  code: { audioLanguage: string; writtenLanguage: string };
  language: string;
}
@Component({
  selector: 'app-message-wrapper',
  templateUrl: './message-wrapper.component.html',
  styleUrls: ['./message-wrapper.component.scss']
})
export class MessageWrapperComponent implements OnInit {
  @Input() title: string;
  @Input() user: string;

  // Number
  public enterKey: number = 13;

  // String
  public translatedValue: string = '';
  public text: string = '';
  public sendBtnValue: string;
  public listenBtnValue: string;
  public flag: string;
  public country;

  // Boolean
  public micro: boolean = false;
  public error: boolean = false;

  // Const
  public countries: Countries[] = COUNTRIES;

  constructor(
    private translateService: TranslateService,
    private settingsService: SettingsService,
    private permissionsService: PermissionsService,
    private toastService: ToastService,
    private audioRecordingService: AudioRecordingService,
    private speechRecognitionService: SpeechRecognitionService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.displayFlag(this.user);
    if (this.user === 'advisor') {
      this.title = VOCABULARY_V2.find(item => item.isoCode === this.settingsService.advisor.language).sentences.find(s => s.key === 'translation-h2').value;
      this.sendBtnValue = VOCABULARY_V2.find(item => item.isoCode === this.settingsService.advisor.language).sentences.find(s => s.key === 'send').value;
      this.listenBtnValue = VOCABULARY_V2.find(item => item.isoCode === this.settingsService.advisor.language).sentences.find(s => s.key === 'listen').value;
    } else if (this.user === 'guest') {
      this.title = VOCABULARY_V2.find(item => item.isoCode === this.settingsService.guest.value.language).sentences.find(s => s.key === 'translation-h2').value;
      this.sendBtnValue = VOCABULARY_V2.find(item => item.isoCode === this.settingsService.guest.value.language).sentences.find(s => s.key === 'send').value;
      this.listenBtnValue = VOCABULARY_V2.find(item => item.isoCode === this.settingsService.guest.value.language).sentences.find(s => s.key === 'listen').value;
    }
  }

  public findLanguage(user): void {
    if (this.user == 'guest') {
      console.log('access ok');
      this.router.navigate(['choice']);
    } else { console.log('no access'); }
  }

  public displayFlag(user) {
    if (this.user == 'advisor') {
      this.country = this.countries.find(element => element.flag == 'FR');
      this.flag = this.country.flag;
    } else if (this.user == 'guest') {
      this.country = this.countries.find(element => element.code.writtenLanguage == this.translateService.guest.writtenLanguage);
      this.flag = this.country.flag;
    }
  }

  public async talk(user: string): Promise<void> {
    this.micro = true;
  }

  public delete(): void {
    this.text = '';
  }

  public send(user: string): void {
    this.translateService.translate(this.text, this.user).subscribe(res => {
      this.translatedValue = res;
    });
  }

  public listen(value: 'translation' | 'speech'): void {}

  public audioSending(message: string): void {
    console.log('message : ', this.text);
  }

  public exitRecord() {
    this.micro = false;
  }
}
