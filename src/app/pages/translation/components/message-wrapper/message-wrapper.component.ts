import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { VOCABULARY_V2, VOCABULARY_DEFAULT } from 'src/app/data/vocabulary';
import { TranslateService } from 'src/app/services/translate.service';
import { SettingsService } from 'src/app/services/settings.service';
import { AudioRecordingService } from 'src/app/services/audio-recording.service';
import { TextToSpeechService } from 'src/app/services/text-to-speech.service';
import { ToastService } from 'src/app/services/toast.service';
import { NewMessage } from 'src/app/models/new-message';
import { Stream } from 'src/app/models/stream';
import { SpeechRecognitionService } from 'src/app/services/speech-recognition.service';

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
  public sendBtnValue: string;
  public flag: string;
  public languageOrigin: string;
  public rawSpeech: HTMLAudioElement;
  public translatedSpeech: HTMLAudioElement;
  public interim: string = '';

  public micro: boolean = false;
  public recordMode: boolean = false;
  public speak: boolean = false;

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
    private speechRecognitionService: SpeechRecognitionService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.languageOrigin = this.user === 'advisor' ? this.settingsService.advisor.language : this.settingsService.guest.value.language;
    const sentences = this.isLanguageExist || this.user === 'advisor' ? VOCABULARY_V2.find((item) => item.isoCode === this.languageOrigin).sentences : VOCABULARY_DEFAULT.sentences;
    this.title = sentences.find((s) => s.key === 'translation-h2').value;
    this.sendBtnValue = sentences.find((s) => s.key === 'send').value;
    this.flag = this.isLanguageExist ? sentences.find((s) => s.key === 'flag').value.toLowerCase() : this.languageOrigin.split('-')[1].toLowerCase();
    this.language = this.user === 'guest' ? 'fr-FR' : this.settingsService.guest.value.language;
  }

  public async talk(): Promise<void> {
    if ('webkitSpeechRecognition' in window) {
      this.micro = true;
      this.recordMode = this.settingsService.recordMode;
      if (!this.recordMode) {
        this.rawText = '';
        this.stream();
      }

      this.speak = true;
    } else {
      this.toastService.showToast("L'accès au microphone n'est pas autorisé.", 'toast-info');
    }
  }

  private stream() {
    let saveText = '';
    this.speechRecognitionService.record(this.languageOrigin).subscribe((value: Stream) => {
      if (value.interim != '') {
        this.rawText += '  ...';
      } else {
        this.rawText = saveText + value.final;
        saveText = this.rawText;
      }
    });
  }

  public exitStream() {
    this.speechRecognitionService.DestroySpeechObject();
    this.speak = false;
  }
  public delete(): void {
    this.rawText = '';
  }

  public async send(fromKeyBoard?: boolean, message?: string): Promise<void> {
    if ((this.rawText && this.rawText !== undefined) || this.rawText !== '') {

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
      this.speak = false;
    }
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
    this.speak = false;
    this.recordMode = false;
    this.isReady.listenSpeech = true;
    this.send(false, message);
  }

  public exitRecord() {
    this.micro = false;
    this.speak = false;
    this.recordMode = false;
  }
}
