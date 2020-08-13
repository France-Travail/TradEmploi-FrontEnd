import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {  Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { VOCABULARY, VOCABULARY_DEFAULT } from 'src/app/data/vocabulary';
import { Stream } from 'src/app/models/stream';
import { Message } from 'src/app/models/translate/message';
import { AudioRecordingService } from 'src/app/services/audio-recording.service';
import { SettingsService } from 'src/app/services/settings.service';
import { SpeechRecognitionService } from 'src/app/services/speech-recognition.service';
import { TextToSpeechService } from 'src/app/services/text-to-speech.service';
import { ToastService } from 'src/app/services/toast.service';
import { ChatService } from 'src/app/services/chat.service';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-message-wrapper',
  templateUrl: './message-wrapper.component.html',
  styleUrls: ['./message-wrapper.component.scss'],
})
export class MessageWrapperComponent implements OnInit {
  @Input() title: string;
  @Input() role: string;
  @Input() originText: Message;

  @Output() messagesToEmit = new EventEmitter();


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
  public interim: string = '';
  public recordMode: boolean = false;
  public speak: boolean = false;

  private isMobile: boolean = false;

  constructor(
    private toastService: ToastService,
    private settingsService: SettingsService,
    private audioRecordingService: AudioRecordingService,
    public textToSpeechService: TextToSpeechService,
    public router: Router,
    private breakpointObserver: BreakpointObserver,
    private speechRecognitionService: SpeechRecognitionService,
    private chatService: ChatService
  ) {}


  ngOnInit(): void {
    this.languageOrigin = this.role === Role.ADVISOR? this.settingsService.defaultLanguage : this.settingsService.user.value.language.written;
    const isLanguageExist = VOCABULARY.some((item) => item.isoCode === this.settingsService.user.value.language.written);
    const data = isLanguageExist || this.role === Role.ADVISOR ? VOCABULARY.find((item) => item.isoCode === this.languageOrigin) : VOCABULARY_DEFAULT;
    this.title = data.sentences.translationH2;
    this.sendBtnValue = data.sentences.send;
    this.flag = isLanguageExist ? data.flag.toLowerCase() : this.languageOrigin.split('-')[1].toLowerCase();
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      this.isMobile = result.matches;
    });
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

  private async sendToOneDevice(text: string){
      this.message = {
          time: Date.now().toString(),
          text: text,
          languageOrigin: this.languageOrigin,
          flag: this.flag,
          role: this.role,
        };
      this.messagesToEmit.emit(this.message);
  }

  private async sendToMultiDevices(user: User,text: string) {
      const message: Message = {
        time: Date.now().toString(),
        text: text,
        languageOrigin: this.languageOrigin,
        flag: this.flag,
        role: this.role,
        member: user.firstname ?  user.firstname: "Pôle emploi"
      }
      this.chatService.sendMessage(user.roomId, message ) 
  }

}
