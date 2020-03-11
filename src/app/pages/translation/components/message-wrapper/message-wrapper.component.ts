import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { VOCABULARY_V2 } from 'src/app/data/vocabulary';
import { TranslateService } from 'src/app/services/translate.service';
import { SettingsService } from 'src/app/services/settings.service';
import { AudioRecordingService } from 'src/app/services/audio-recording.service';
import { TextToSpeechService } from 'src/app/services/text-to-speech.service';
import { PermissionsService } from 'src/app/services/permissions.service';
import { ToastService } from 'src/app/services/toast.service';

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
  public advisorTranslatedValue: string = '';
  public text: string = '';
  public advisorText: string = '';
  public sendBtnValue: string;
  public listenBtnValue: string;
  public flag: string;
  public language: string;

  // Boolean
  public micro: boolean = false;
  public error: boolean = false;
  public isReady: {listenTranslation: boolean; listenSpeech: boolean} = {listenTranslation: false, listenSpeech: false}

  constructor(
    private toastService: ToastService,
    private translateService: TranslateService,
    private settingsService: SettingsService,
    private audioRecordingService: AudioRecordingService,
    public textToSpeechService: TextToSpeechService,
    private permissionsService: PermissionsService,
    public router: Router) {}

  ngOnInit(): void {
  
    if (this.user === 'advisor') {
      this.title = VOCABULARY_V2.find(item => item.isoCode === this.settingsService.advisor.language).sentences.find(s => s.key === 'translation-h2').value;
      this.sendBtnValue = VOCABULARY_V2.find(item => item.isoCode === this.settingsService.advisor.language).sentences.find(s => s.key === 'send').value;
      this.listenBtnValue = VOCABULARY_V2.find(item => item.isoCode === this.settingsService.advisor.language).sentences.find(s => s.key === 'listen').value;
      this.flag = VOCABULARY_V2.find(item => item.isoCode === this.settingsService.advisor.language).sentences.find(s => s.key === 'flag').value.toLowerCase();
      this.language = VOCABULARY_V2.find(item => item.isoCode === this.settingsService.guest.value.language).isoCode.substr(0, 2);
    }  else if (this.user === 'guest'){
      this.title = VOCABULARY_V2.find(item => item.isoCode === this.settingsService.guest.value.language).sentences.find(s => s.key === 'translation-h2').value;
      this.sendBtnValue = VOCABULARY_V2.find(item => item.isoCode === this.settingsService.guest.value.language).sentences.find(s => s.key === 'send').value;
      this.listenBtnValue = VOCABULARY_V2.find(item => item.isoCode === this.settingsService.guest.value.language).sentences.find(s => s.key === 'listen').value;
      this.flag = VOCABULARY_V2.find(item => item.isoCode === this.settingsService.guest.value.language).sentences.find(s => s.key === 'flag').value.toLowerCase();
      this.language = VOCABULARY_V2.find(item => item.isoCode === this.settingsService.guest.value.language).isoCode.substr(0, 2);
    }
  }

  public switchLanguage(): void {
    if (this.user === 'guest') {
      this.router.navigate(['choice']);
    }
  }

  public async talk(): Promise<void> {
    if (!this.permissionsService.isAllowed) {
      try {
        this.permissionsService.isAllowed = await this.permissionsService.check();
      } catch (error) {
        this.toastService.showToast("L'accès au microphone n'est pas autorisé.");
      }
    }
    if (this.permissionsService.isAllowed) {
      this.micro = true;
    }
  }

  public delete(): void {
    this.text = '';
  }

  public async send(): Promise<void> {
    if (this.text === '') {
      const text = 'bonjour'
      // this.text = await
    }
    if (this.user === 'advisor') {
      this.translateService.translate(this.advisorText, this.user).subscribe(async res => {
        this.advisorTranslatedValue = res;
        // console.log('text :', this.advisorText)
        this.isReady.listenTranslation = await this.textToSpeechService.getSpeech(this.advisorTranslatedValue, this.language, this.user);
      })
    } 
    this.translateService.translate(this.text, this.user).subscribe(async res => {
      this.translatedValue = res;
      // console.log('text :', this.text)
      this.isReady.listenTranslation = await this.textToSpeechService.getSpeech(this.translatedValue, this.language, this.user);
    })
  }

  public listen(value: 'translation' | 'speech'): void {
    if (value === 'speech') {
      this.audioRecordingService.audioSpeech.play()
    } else {
      this.textToSpeechService.audioSpeech.play()
    }
  }

  public audioSending(isTimeOut: boolean): void {
    this.micro = false;
    this.isReady.listenSpeech = true;
    this.send()
  }

  public exitGauge() {
    this.micro = false;
  }

}
