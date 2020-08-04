import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgControl, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { MatKeyboardComponent, MatKeyboardRef, MatKeyboardService } from 'angular-onscreen-material-keyboard';
import { VOCABULARY, VOCABULARY_DEFAULT } from 'src/app/data/vocabulary';
import { Stream } from 'src/app/models/stream';
import { Message } from 'src/app/models/translate/message';
import { AudioRecordingService } from 'src/app/services/audio-recording.service';
import { SettingsService } from 'src/app/services/settings.service';
import { SpeechRecognitionService } from 'src/app/services/speech-recognition.service';
import { TextToSpeechService } from 'src/app/services/text-to-speech.service';
import { ToastService } from 'src/app/services/toast.service';
import { TranslateService } from 'src/app/services/translate.service';
import { ChatService } from 'src/app/services/chat.service';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-message-wrapper',
  templateUrl: './message-wrapper.component.html',
  styleUrls: ['./message-wrapper.component.scss'],
})
export class MessageWrapperComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() title: string;
  @Input() role: string;
  @Input() originText: Message;

  @Output() messagesToEmit = new EventEmitter();

  @ViewChild('attachedInput', { read: ElementRef })
  private inputElement: ElementRef;
  @ViewChild('attachedInput', { read: NgModel })
  private attachToControl: NgControl;

  public rawText: string;
  public message: Message;
  public sendBtnValue: string;
  public flag: string;
  public languageOrigin: string;
  public rawSpeech: HTMLAudioElement;
  public translatedSpeech: HTMLAudioElement;
  public translatedText: string = '';
  public micro: boolean = false;
  public error: boolean = false;
  public isReady: { listenTranslation: boolean; listenSpeech: boolean } = { listenTranslation: false, listenSpeech: false };
  public languageKeyboard: string;
  public interim: string = '';
  public recordMode: boolean = false;
  public speak: boolean = false;
  public autoOpenKeyboard: boolean = false;

  private keyboardRef: MatKeyboardRef<MatKeyboardComponent>;
  private isMobile: boolean = false;
  private isTablet: boolean = false;
  private container: Element;
  private marginKeyboard: number;

  constructor(
    private toastService: ToastService,
    private settingsService: SettingsService,
    private audioRecordingService: AudioRecordingService,
    public textToSpeechService: TextToSpeechService,
    public router: Router,
    private breakpointObserver: BreakpointObserver,
    private speechRecognitionService: SpeechRecognitionService,
    private keyboardService: MatKeyboardService,
    private chatService: ChatService
  ) {}

  ngAfterViewInit() {
    this.container =
      document.documentElement.getElementsByClassName('oneDevice')[0] != undefined
        ? document.documentElement.getElementsByClassName('oneDevice')[0]
        : document.documentElement.getElementsByClassName('multiDevices')[0];
    if (this.inputElement != undefined) {
      this.inputElement.nativeElement.addEventListener('blur', () => {
        this.closeCurrentKeyboard();
      });
    }
  }
  ngOnDestroy() {
    this.closeCurrentKeyboard();
  }
  ngOnInit(): void {
    this.languageOrigin = this.role === Role.ADVISOR? this.settingsService.defaultLanguage : this.settingsService.user.value.language.written;
    const isLanguageExist = VOCABULARY.some((item) => item.isoCode === this.settingsService.user.value.language.written);
    const data = isLanguageExist || this.role === Role.ADVISOR ? VOCABULARY.find((item) => item.isoCode === this.languageOrigin) : VOCABULARY_DEFAULT;
    this.title = data.sentences.translationH2;
    this.sendBtnValue = data.sentences.send;
    this.flag = isLanguageExist ? data.flag.toLowerCase() : this.languageOrigin.split('-')[1].toLowerCase();
    this.languageKeyboard = this.languageOrigin.split('-')[0];
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      this.isMobile = result.matches;
    });

    this.breakpointObserver.observe([Breakpoints.Tablet]).subscribe((result) => {
      this.isTablet = result.matches;
    });
    this.marginKeyboard = this.isTablet ? 250 : window.innerHeight - 600;
  }

  ngOnChanges() {
    if (this.originText) {
      this.rawText = this.originText.text;
    }
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
      this.send(false);
    }, 2000);
  }
  public delete(): void {
    this.rawText = '';
  }

  public async send(fromKeyBoard?: boolean, messageAudio?: string): Promise<void> {
    this.closeCurrentKeyboard();
    if (this.rawText !== '') {
      const user = this.settingsService.user.value
      const message = messageAudio === undefined ? this.rawText : messageAudio;
      const isMultiDevices = user.roomId != undefined
      if(isMultiDevices){
        this.sendToMultiDevices(user, message)
      }else{
        this.sendToOneDevice(message)
      }
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
    this.micro = false;
    this.speak = false;
    this.recordMode = false;
    this.isReady.listenSpeech = true;
    this.rawText = undefined;
    if (message != '') {
      this.send(false, message);
    } else {
      this.toastService.showToast('Traduction indisponible momentanément. Merci de réessayer plus tard.', 'toast-error');
    }
  }

  public exitRecord() {
    this.micro = false;
    this.speak = false;
    this.recordMode = false;
  }

  public closeCurrentKeyboard() {
    if (this.keyboardRef) {
      this.keyboardRef.dismiss();
      this.container.setAttribute('style', 'padding-bottom: 0;');
    }
  }
  public openAttachedKeyboard() {
    if (!this.keyboardService.isOpened && this.autoOpenKeyboard) {
      this.keyboardRef = this.keyboardService.open(this.languageKeyboard);
      this.keyboardRef.instance.setInputInstance(this.inputElement);
      this.keyboardRef.instance.attachControl(this.attachToControl.control);
      this.container.setAttribute('style', 'padding-bottom:' + this.marginKeyboard.toString() + 'px;');
      window.scrollBy(0, this.marginKeyboard);
    }
  }
  public switchAutoOpenKeyboard() {
    if (this.keyboardRef) {
      this.keyboardRef.dismiss();
      this.container.setAttribute('style', 'padding-bottom: 0;');
    }
    this.autoOpenKeyboard = !this.autoOpenKeyboard;
    if (this.autoOpenKeyboard) {
      this.openAttachedKeyboard();
    }
  }
  
  private async sendToOneDevice(text: string){
      this.message = {
          id: new Date().getTime().toString(),
          text: text,
          languageOrigin: this.languageOrigin,
          flag: this.flag,
          role: this.role,
        };
      this.messagesToEmit.emit(this.message);
  }

  private async sendToMultiDevices(user: User,text: string) {
      const message: Message = {
        id: new Date().getTime().toString(),
        text: text,
        languageOrigin: this.languageOrigin,
        flag: this.flag,
        role: this.role,
        member: user.firstname ?  user.firstname: null
      }
      this.chatService.sendMessage(user.roomId, message ) 
  }

}
