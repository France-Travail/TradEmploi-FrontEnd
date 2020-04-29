import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { NgControl, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { MatKeyboardComponent, MatKeyboardRef, MatKeyboardService } from 'angular-onscreen-material-keyboard';
import { Subscription } from 'rxjs/internal/Subscription';
import { VOCABULARY, VOCABULARY_DEFAULT } from 'src/app/data/vocabulary';
import { NewMessage } from 'src/app/models/new-message';
import { Stream } from 'src/app/models/stream';
import { AudioRecordingService } from 'src/app/services/audio-recording.service';
import { SettingsService } from 'src/app/services/settings.service';
import { SpeechRecognitionService } from 'src/app/services/speech-recognition.service';
import { TextToSpeechService } from 'src/app/services/text-to-speech.service';
import { ToastService } from 'src/app/services/toast.service';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-message-wrapper',
  templateUrl: './message-wrapper.component.html',
  styleUrls: ['./message-wrapper.component.scss'],
})
export class MessageWrapperComponent implements OnInit, OnDestroy, AfterViewInit {
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
  public translatedText: string = '';

  // Boolean
  public micro: boolean = false;
  public error: boolean = false;
  public isReady: { listenTranslation: boolean; listenSpeech: boolean } = { listenTranslation: false, listenSpeech: false };
  // keyboard
  public languageKeyboard: string;
  private enterSubscription: Subscription;
  private keyboardRef: MatKeyboardRef<MatKeyboardComponent>;

  @ViewChild('attachTo', { read: ElementRef })
  private inputElement: ElementRef;
  @ViewChild('attachTo', { read: NgModel })
  private attachToControl: NgControl;

  private messageInterceptor: string;
  public showKeyboard: boolean;

  public interim: string = '';

  public recordMode: boolean = false;
  public speak: boolean = false;

  private language: string;
  private isMobile: boolean = false;

  constructor(
    private toastService: ToastService,
    private translateService: TranslateService,
    private settingsService: SettingsService,
    private audioRecordingService: AudioRecordingService,
    public textToSpeechService: TextToSpeechService,
    public router: Router,
    private breakpointObserver: BreakpointObserver,
    private speechRecognitionService: SpeechRecognitionService,
    private keyboardService: MatKeyboardService
  ) {}

  ngAfterViewInit() {
    this.inputElement.nativeElement.addEventListener('blur', (event) => {
      this.closeCurrentKeyboard();
    });
  }
  ngOnDestroy() {
    this.closeCurrentKeyboard();
  }
  ngOnInit(): void {
    this.languageOrigin = this.user === 'advisor' ? this.settingsService.advisor.language : this.settingsService.guest.value.language;
    const isLanguageExist = VOCABULARY.some((item) => item.isoCode === this.settingsService.guest.value.language);
    const data = isLanguageExist || this.user === 'advisor' ? VOCABULARY.find((item) => item.isoCode === this.languageOrigin) : VOCABULARY_DEFAULT;
    this.title = data.sentences.translationH2;
    this.sendBtnValue = data.sentences.send;
    this.flag = isLanguageExist ? data.flag.toLowerCase() : this.languageOrigin.split('-')[1].toLowerCase();
    this.language = this.user === 'guest' ? 'fr-FR' : this.settingsService.guest.value.language;
    this.languageKeyboard = this.languageOrigin.split('-')[0];
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      this.showKeyboard = !result.matches;
    });
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      this.isMobile = result.matches;
    });
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
      if (this.isMobile) {
        this.rawText = value.final;
      } else {
        if (value.interim !== '') {
          this.rawText += '  .';
        } else {
          this.rawText = saveText + value.final;
          saveText = this.rawText;
        }
      }
    });
  }

  public exitStream() {
    this.speechRecognitionService.DestroySpeechObject();
    this.speak = false;
    setTimeout(() => {
      this.send(false, this.rawText);
    }, 1000);
  }
  public delete(): void {
    this.rawText = '';
  }

  public async send(fromKeyBoard?: boolean, message?: string): Promise<void> {
    this.closeCurrentKeyboard();
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

  public closeCurrentKeyboard() {
    if (this.keyboardRef) {
      this.keyboardRef.dismiss();
    }

    if (this.enterSubscription) {
      this.enterSubscription.unsubscribe();
    }
  }
  public openAttachedKeyboard() {
    this.keyboardRef = this.keyboardService.open(this.languageKeyboard);
    this.keyboardRef.instance.setInputInstance(this.inputElement);
    this.keyboardRef.instance.attachControl(this.attachToControl.control);
  }
}
