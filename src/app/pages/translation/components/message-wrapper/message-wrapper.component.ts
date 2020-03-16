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
  public sendBtnValue: string;
  public listenBtnValue: string;
  public flag: string;
  public language: string;

  public rawSpeech: HTMLAudioElement;
  public translatedSpeech: HTMLAudioElement;
  public rawText: string = '';
  public translatedText: string = '';

  // Boolean
  public micro: boolean = false;
  public error: boolean = false;
  public isReady: { listenTranslation: boolean; listenSpeech: boolean } = { listenTranslation: false, listenSpeech: false };

  constructor(
    private toastService: ToastService,
    private translateService: TranslateService,
    private settingsService: SettingsService,
    private audioRecordingService: AudioRecordingService,
    public textToSpeechService: TextToSpeechService,
    private permissionsService: PermissionsService,
    public router: Router
  ) {}

  ngOnInit(): void {
    const language: string = this.user === 'advisor' ? this.settingsService.advisor.language : this.settingsService.guest.value.language;
    const sentences = VOCABULARY_V2.find(item => item.isoCode === language).sentences;
    this.title = sentences.find(s => s.key === 'translation-h2').value;
    this.sendBtnValue = sentences.find(s => s.key === 'send').value;
    this.listenBtnValue = sentences.find(s => s.key === 'listen').value;
    this.flag = sentences.find(s => s.key === 'flag').value.toLowerCase();
    this.language = this.user === 'guest' ? 'fr-FR' : VOCABULARY_V2.find(item => item.isoCode === this.settingsService.guest.value.language).isoCode;
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
    this.rawText = '';
  }

  public async send(fromKeyBoard?: boolean): Promise<void> {
    if (fromKeyBoard) {
      const language = this.user === 'advisor' ? 'fr-FR' : VOCABULARY_V2.find(item => item.isoCode === this.settingsService.guest.value.language).isoCode;
      this.isReady.listenSpeech = await this.textToSpeechService.getSpeech(this.rawText, language, this.user);
      this.rawSpeech = this.textToSpeechService.audioSpeech;
    } else {
      if (this.rawText === '') {
        this.rawText = 'bonjour';
      }
      this.rawSpeech = this.audioRecordingService.audioSpeech;
    }
  
    this.translateService.translate(this.rawText, this.user).subscribe(async response => {
      this.translatedText = response;
      this.isReady.listenTranslation = await this.textToSpeechService.getSpeech(this.translatedText, this.language, this.user);
      this.translatedSpeech = this.textToSpeechService.audioSpeech;
    });
  }

  public listen(value: 'translation' | 'speech'): void {
    if (value === 'speech') {
      this.rawSpeech.play();
    } else {
      this.translatedSpeech.play();
    }
  }

  public audioSending(isTimeOut: boolean): void {
    this.exitGauge();
    this.isReady.listenSpeech = true;
    this.send();
  }

  public exitGauge() {
    this.micro = false;
  }
}
