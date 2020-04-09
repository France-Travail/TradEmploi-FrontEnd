import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { VOCABULARY_V2, VOCABULARY_DEFAULT } from 'src/app/data/vocabulary';
import { TranslateService } from 'src/app/services/translate.service';
import { SettingsService } from 'src/app/services/settings.service';
import { AudioRecordingService } from 'src/app/services/audio-recording.service';
import { TextToSpeechService } from 'src/app/services/text-to-speech.service';
import { ToastService } from 'src/app/services/toast.service';
import { NewMessage } from 'src/app/models/new-message';

@Component({
  selector: 'app-message-wrapper',
  templateUrl: './message-wrapper.component.html',
  styleUrls: ['./message-wrapper.component.scss'],
})
export class MessageWrapperComponent implements OnInit {
  @Input() title: string;
  @Input() user: string;
  @Input() rawText: string;

  @Output() newMessagesToEmit = new EventEmitter();

  public newMessage: NewMessage;
  public sendBtnWording: string;
  public flag: string;
  public languageOrigin: string;
  public rawSpeech: HTMLAudioElement;
  public translatedSpeech: HTMLAudioElement;

  public micro: boolean = false;
  public recordMode: boolean = false;

  private isReady: { listenTranslation: boolean; listenSpeech: boolean } = { listenTranslation: false, listenSpeech: false };
  private language: string;
  private messageInterceptor: string;
  private isLanguageExist = VOCABULARY_V2.some((item) => item.isoCode === this.settingsService.guest.value.language);

  constructor(
    private toastService: ToastService,
    private translateService: TranslateService,
    private settingsService: SettingsService,
    private audioRecordingService: AudioRecordingService,
    public textToSpeechService: TextToSpeechService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.languageOrigin = this.user === 'advisor' ? this.settingsService.advisor.language : this.settingsService.guest.value.language;
    const sentences = this.isLanguageExist || this.user === 'advisor' ? VOCABULARY_V2.find((item) => item.isoCode === this.languageOrigin).sentences : VOCABULARY_DEFAULT.sentences;
    this.title = sentences.find((s) => s.key === 'translation-h2').value;
    this.sendBtnWording = sentences.find((s) => s.key === 'send').value;
    this.flag = this.isLanguageExist ? sentences.find((s) => s.key === 'flag').value.toLowerCase() : this.languageOrigin.split('-')[1].toLowerCase();
    this.language = this.user === 'guest' ? 'fr-FR' : this.settingsService.guest.value.language;
    console.log('this.settingsService.recordMode :', this.settingsService.recordMode);
  }

  public async talk(): Promise<void> {
    if ('webkitSpeechRecognition' in window) {
      //1er cas init micro apparaisse
      this.micro = true;
      this.recordMode = this.settingsService.recordMode;
      //2 cas  micro et stream
      //3 cas micro et record => c le seul cas ou le micro disparait
    } else {
      this.toastService.showToast("L'accès au microphone n'est pas autorisé.", 'toast-info');
    }
  }

  public delete(): void {
    this.rawText = '';
  }

  public async send(fromKeyBoard?: boolean, message?: string): Promise<void> {
    if (fromKeyBoard) {
      const language = this.user === 'advisor' ? 'fr-FR' : this.settingsService.guest.value.language;
      this.isReady.listenSpeech = await this.textToSpeechService.getSpeech(this.rawText, language, this.user);
      this.rawSpeech = this.textToSpeechService.audioSpeech;
      this.messageInterceptor = this.rawText;
    } else {
      this.rawText = message;
      this.rawSpeech = this.audioRecordingService.audioSpeech;
    }

    this.translateService.translate(this.rawText, this.user).subscribe(async (response) => {
      this.isReady.listenTranslation = await this.textToSpeechService.getSpeech(response, this.language, this.user);
      this.translatedSpeech = this.textToSpeechService.audioSpeech;
      this.newMessage = {
        message: this.messageInterceptor,
        translation: response,
        user: this.user,
        language: this.languageOrigin,
        translatedSpeech: this.translatedSpeech,
        flag: this.flag,
      };
      this.newMessagesToEmit.emit(this.newMessage);
    });
    this.rawText = '';
  }

  public listen(value: 'translation' | 'speech'): void {
    if (value === 'speech') {
      this.audioRecordingService.audioSpeech.play();
    } else {
      this.translatedSpeech.play();
    }
  }

  public audioSending(message: string): void {
    this.messageInterceptor = message;
    this.micro = false;
    this.recordMode = false;
    this.isReady.listenSpeech = true;
    this.send(false, message);
  }

  public exitRecord() {
    this.micro = false;
    this.recordMode = false;
  }
}
