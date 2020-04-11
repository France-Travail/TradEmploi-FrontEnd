import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { VOCABULARY_V2, VOCABULARY_DEFAULT } from 'src/app/data/vocabulary';
import { TranslateService } from 'src/app/services/translate.service';
import { SettingsService } from 'src/app/services/settings.service';
import { AudioRecordingService } from 'src/app/services/audio-recording.service';
import { TextToSpeechService } from 'src/app/services/text-to-speech.service';
import { ToastService } from 'src/app/services/toast.service';
import { NewMessage } from 'src/app/models/new-message';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { MatKeyboardRef, MatKeyboardComponent, MatKeyboardService } from 'angular-onscreen-material-keyboard';
import { NgControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-message-wrapper',
  templateUrl: './message-wrapper.component.html',
  styleUrls: ['./message-wrapper.component.scss'],
})
export class MessageWrapperComponent implements OnInit, AfterViewInit {
  @Input() title: string;
  @Input() user: string;
  @Input() rawText: string;

  @Output() newMessagesToEmit = new EventEmitter();

  public messages = [];
  public newMessage: NewMessage;

  // Number
  public enterKey: number = 13;

  // String
  public sendBtnValue: string;
  public listenBtnValue: string;
  public flag: string;
  public language: string;
  public languageOrigin: string;

  public rawSpeech: HTMLAudioElement;
  public translatedSpeech: HTMLAudioElement;
  public translatedText: string = '';
  public isLanguageExist = VOCABULARY_V2.some((item) => item.isoCode === this.settingsService.guest.value.language);
  // Boolean
  public micro: boolean = false;
  public error: boolean = false;
  public isReady: { listenTranslation: boolean; listenSpeech: boolean } = { listenTranslation: false, listenSpeech: false };
  //keyboard
  private languageKeyboard: string;
  private messageInterceptor: string;
  public showKeyboard: boolean;
  private _enterSubscription: Subscription;

  private _keyboardRef: MatKeyboardRef<MatKeyboardComponent>;

  private _submittedForms = new BehaviorSubject<{ control: string; value: string }[][]>([]);

  @ViewChild('attachTo')
  private _attachToElement: ElementRef;

  @ViewChild('attachTo')
  private _attachToControl: NgControl;

  constructor(
    private toastService: ToastService,
    private translateService: TranslateService,
    private settingsService: SettingsService,
    private audioRecordingService: AudioRecordingService,
    public textToSpeechService: TextToSpeechService,
    public router: Router,
    private breakpointObserver: BreakpointObserver,
    private _keyboardService: MatKeyboardService
  ) {}
  ngAfterViewInit() {
    console.log(this._attachToElement);
  }
  ngOnInit(): void {
    this.languageOrigin = this.user === 'advisor' ? this.settingsService.advisor.language : this.settingsService.guest.value.language;
    let sentences = this.isLanguageExist || this.user === 'advisor' ? VOCABULARY_V2.find((item) => item.isoCode === this.languageOrigin).sentences : VOCABULARY_DEFAULT.sentences;
    this.title = sentences.find((s) => s.key === 'translation-h2').value;
    this.sendBtnValue = sentences.find((s) => s.key === 'send').value;
    this.listenBtnValue = sentences.find((s) => s.key === 'listen').value;
    this.flag = this.isLanguageExist ? sentences.find((s) => s.key === 'flag').value.toLowerCase() : this.languageOrigin.split('-')[1].toLowerCase();
    this.language = this.user === 'guest' ? 'fr-FR' : this.settingsService.guest.value.language;
    this.languageKeyboard = this.languageOrigin.split('-')[0];
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      this.showKeyboard = !result.matches;
    });
  }

  public async talk(): Promise<void> {
    if ('webkitSpeechRecognition' in window) {
      this.micro = true;
    } else {
      this.toastService.showToast("L'accès au microphone n'est pas autorisé.", 'toast-info');
    }
  }

  public delete(): void {
    this.rawText = '';
  }

  public async send(fromKeyBoard?: boolean, message?: string): Promise<void> {
    console.log(this.rawText);
    if (this.rawText && this.rawText !== '') {
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
        this.translatedText = response;
        this.isReady.listenTranslation = await this.textToSpeechService.getSpeech(this.translatedText, this.language, this.user);
        this.translatedSpeech = this.textToSpeechService.audioSpeech;
        this.newMessage = {
          message: this.messageInterceptor,
          translation: this.translatedText,
          user: this.user,
          language: this.languageOrigin,
          translatedSpeech: this.translatedSpeech,
          flag: this.flag,
        };
        this.newMessagesToEmit.emit(this.newMessage);
      });
      this.rawText = '';
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
    this.isReady.listenSpeech = true;
    this.send(false, message);
  }

  public exitRecord() {
    this.micro = false;
  }
  get submittedForms(): Observable<{ control: string; value: string }[][]> {
    return this._submittedForms.asObservable();
  }
  submitForm(form?: NgForm) {
    const submittedForms = this._submittedForms.getValue();
    const submittedForm = Object.keys(form.controls).map((control: string) => ({
      control,
      value: form.controls[control].value,
    }));
    submittedForms.push(submittedForm);
    this._submittedForms.next(submittedForms);
  }

  openKeyboard(locale = this.languageKeyboard) {
    this._keyboardRef = this._keyboardService.open(locale);
    this._enterSubscription = this._keyboardRef.instance.enterClick.subscribe(() => {
      this.submitForm();
    });
  }

  closeCurrentKeyboard() {
    if (this._keyboardRef) {
      this._keyboardRef.dismiss();
    }

    if (this._enterSubscription) {
      this._enterSubscription.unsubscribe();
    }
  }

  openAttachedKeyboard(locale = this.languageKeyboard) {
    this._keyboardRef = this._keyboardService.open(locale);

    // reference the input element
    this._keyboardRef.instance.setInputInstance(this._attachToElement);

    // set control
    this._keyboardRef.instance.attachControl(this._attachToControl.control);
  }
}
