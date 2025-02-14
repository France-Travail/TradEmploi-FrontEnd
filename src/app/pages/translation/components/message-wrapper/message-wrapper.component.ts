import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { MessageWrapped } from '../../../../models/translate/message-wrapped';
import { RecordingState } from '../../../../models/RecordingState';
import { SpeechToTextMicrosoftService } from '../../../../services/speech-to-text-microsoft';
import { ERROR_FUNC_UNAUTHORIZEDMICRO } from '../../../../models/error/errorFunctionnal';
import { environment } from '../../../../../environments/environment';
import { ERROR_TECH_UNAUTHORIZEDMICRO } from '../../../../models/error/errorTechnical';
import { Tooltip, Vocabulary } from '../../../../models/vocabulary';
import { TranslationMode } from '../../../../models/kpis/translationMode';
import { ToastService } from '../../../../services/toast.service';
import { AdvisorDefaultName, SettingsService } from '../../../../services/settings.service';
import { SpeechRecognitionService } from '../../../../services/speech-recognition.service';
import { ChatService } from '../../../../services/chat.service';
import { ErrorService } from '../../../../services/error.service';
import { Role } from '../../../../models/role';
import { Stream } from '../../../../models/stream';
import { User } from '../../../../models/user';
import { Message } from '../../../../models/translate/message';
import { VOCABULARY, VOCABULARY_DEFAULT } from '../../../../data/vocabulary';
import { params } from '../../../../../environments/params';
import { Observable } from 'rxjs';
import { FRENCH } from '../../../../data/sentence';

@Component({
  selector: 'app-message-wrapper',
  templateUrl: './message-wrapper.component.html',
  styleUrls: ['./message-wrapper.component.scss']
})
export class MessageWrapperComponent implements OnInit, OnChanges, AfterViewInit {
  private track: MediaStream;

  constructor(
    private readonly toastService: ToastService,
    private readonly settingsService: SettingsService,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly speechRecognitionService: SpeechRecognitionService,
    private readonly chatService: ChatService,
    private readonly errorService: ErrorService,
    private readonly speechToTextMicrosoftService: SpeechToTextMicrosoftService
  ) {
  }

  @Input() role: string;
  @Input() originText: string;

  @Output() messagesToEmit = new EventEmitter<MessageWrapped>();
  @Output() microChange = new EventEmitter<boolean>();
  @Input() altMicro: Observable<boolean>;
  @ViewChild('customslide', { read: ElementRef }) element: ElementRef | undefined;

  public rawText = '';
  public sendBtnValue: string;
  public flag: string;
  public languageOrigin: string;
  public translatedSpeech: HTMLAudioElement;
  public micro = false;
  public error = false;
  public isReady: { listenTranslation: boolean; listenSpeech: boolean } = {
    listenTranslation: false,
    listenSpeech: false
  };
  public interim = '';
  public recordMode = false;
  public speaking = false;
  public isFemaleSpeaking = false;
  public canSend = false;
  public translationMode = TranslationMode.TEXT;
  public languageName: string;
  public voiceNotSupported = false;
  public seconds: number;
  public showTraductionLogo = this.settingsService.showTraductionLogo;
  private isMobile = false;
  private isTablet = false;
  private recordingState = RecordingState.STOPPED;
  private useSpeechToTextMicrosoftApi: boolean;
  private vocabulary: Vocabulary[];
  private isMicrophoneGranted = false;
  protected altMicroActif = false;
  public erase = new EventEmitter<any>();
  public tooltip: Tooltip = FRENCH.tooltip;

  private readonly warningType = 'toast-warning';

  async ngOnInit(): Promise<void> {
    this.languageOrigin = this.role === Role.ADVISOR ? this.settingsService.defaultLanguage.written : this.settingsService.user.value.language.written;
    this.languageName = this.settingsService.user.value.language.languageName;
    this.useSpeechToTextMicrosoftApi = this.fromAzure(this.languageOrigin);

    this.vocabulary = VOCABULARY;

    const isLanguageExist = this.vocabulary.some((item) => item.isoCode === this.settingsService.user.value.language.written);
    const data = isLanguageExist || this.role === Role.ADVISOR ? this.vocabulary.find((item) => item.isoCode === this.languageOrigin) : VOCABULARY_DEFAULT;
    const translationPlaceHolderIos = this.role === Role.ADVISOR ? data.sentences.translationH2Ios : VOCABULARY_DEFAULT.sentences.translationH2Ios;
    this.interim = this.getInterim(data, translationPlaceHolderIos);
    this.sendBtnValue = data.sentences.send;
    this.voiceNotSupported = data.sentences.voiceNotSupported ? data.sentences.voiceNotSupported : false;
    data.isoCode.length > 2 ? this.flag = data.isoCode.split('-')[2].toLowerCase() : this.flag = data.isoCode.split('-')[1].toLowerCase();
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      this.isMobile = result.matches;
    });
    this.isTablet = this.settingsService.isTablet;
    this.altMicro.subscribe(() => {
      this.altMicroActif = !this.altMicroActif;
    });
    await this.requestPermission();
    this.stopMicrophone();
  }

  private getInterim(data: Vocabulary, translationPlaceHolderIos: string) {
    if (this.settingsService.recordMode) {
      return data.sentences.translationH2Mobile;
    } else {
      return data.sentences.translationH2;
    }
  }

  ngOnChanges() {
    if (this.originText) {
      this.rawText = this.originText;
    }
  }

  ngAfterViewInit() {
    const textArea = document.getElementById('msg-wrapper-advisor');
    if (!this.isTablet && !this.isMobile && textArea) {
      textArea.focus();
    }
    if (this.element) {
      this.element.nativeElement.querySelector('.mdc-switch__icon--on').firstChild.setAttribute('d', '');
      this.element.nativeElement.querySelector('.mdc-switch__icon--off').firstChild.setAttribute('d', '');
    }
  }

  public async talk(): Promise<void> {
    if (this.isMicrophoneGranted) {
      if ('webkitSpeechRecognition' in window) {
        this.micro = true;
        this.recordMode = this.settingsService.recordMode;
        if (!this.recordMode) {
          this.rawText = '';
          this.stream();
        }
        this.translationMode = TranslationMode.VOCAL;
        this.speaking = true;
      } else {
        this.toastService.showToast(ERROR_FUNC_UNAUTHORIZEDMICRO.description, this.warningType);
        this.errorService.save(ERROR_TECH_UNAUTHORIZEDMICRO);
      }
    } else {
      this.toastService.showToast(ERROR_FUNC_UNAUTHORIZEDMICRO.description, this.warningType);
      await this.requestPermission();
      this.stopMicrophone();
    }
  }

  public async talkWithMicrosoft(): Promise<void> {
    this.micro = true;
    this.rawText = undefined;
    this.isMobile = false;
    this.streamWithMicrosoft();

    this.translationMode = TranslationMode.VOCAL;
    this.speaking = true;
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

  private async streamWithMicrosoft() {
    if (this.isMicrophoneGranted) {
      let saveText = '';
      const response = await this.speechToTextMicrosoftService.recognize(this.transcodificationMicrosoft(this.languageOrigin));
      response.subscribe((value: Stream) => {
        if (value.interim !== '') {
          this.rawText = value.interim;
        } else if (value.final !== '') {
          this.rawText = saveText + value.final;
          saveText = this.rawText;
        }
      });
    } else {
      this.toastService.showToast(ERROR_FUNC_UNAUTHORIZEDMICRO.description, this.warningType);
      await this.requestPermission();
    }
  }

  private transcodificationMicrosoft(language: string): string {
    if (environment.microsoftSpeechConfig.speechToTextEnabled) {
      if (language === 'ar-XA') {
        return 'ar-EG';
      }
    }
    return language;
  }

  public delete(): void {
    this.rawText = undefined;
    this.canSend = false;
    if (this.recordingState === RecordingState.RECORDING) {
      this.erase.emit();
    }
  }

  public async send(fromKeyBoard = false, messageAudio?: string): Promise<void> {
    if (this.rawText !== '') {
      const user = this.settingsService.user.value;
      const message = messageAudio === undefined || messageAudio === null ? this.rawText : messageAudio;
      if (user.isMultiDevices) {
        this.sendToMultiDevices(user, message);
      } else {
        this.sendToOneDevice(message);
      }
      this.rawText = undefined;
      this.translationMode = TranslationMode.TEXT;
      this.canSend = false;
      this.speaking = false;
    }
  }

  public audioSending(message: string): void {
    this.micro = false;
    this.speaking = false;
    this.recordMode = false;
    this.isReady.listenSpeech = true;
    this.rawText = undefined;
    if (message !== '') {
      this.send(false, message);
    }
  }

  public exitRecord() {
    this.micro = false;
    this.speaking = false;
    this.recordMode = false;
  }

  public displaySendOnClick() {
    this.canSend = true;
  }

  public displaySendOnKeyPress() {
    this.canSend = true;
  }

  public displaySendOnBlur() {
    if (this.rawText === undefined || this.rawText === '') {
      this.canSend = false;
    }
  }

  onHold(time) {
    this.recordingState = RecordingState.RECORDING;
    this.seconds = Math.round(time / 1000);
  }

  onStart() {
    this.requestPermission();
    if (this.recordingState === RecordingState.RECORDING) {
      return;
    }
    this.microChange.emit();
    this.recordingState = RecordingState.RECORDING;
    if (this.useSpeechToTextMicrosoftApi) {
      this.talkWithMicrosoft();
    } else {
      this.talk();
    }
  }

  onStop() {
    this.recordingState = RecordingState.STOPPED;
    this.microChange.emit();
    if (this.rawText) {
      this.canSend = true;
    }
    this.exitRecord();
    if (this.useSpeechToTextMicrosoftApi) {
      this.speechToTextMicrosoftService.stopContinuousRecognitionAsync();
    } else {
      this.speechRecognitionService.DestroySpeechObject();
    }
    this.speaking = false;
    this.seconds = 0;
    this.stopMicrophone();
  }

  private async sendToOneDevice(text: string) {
    const message = this.buildMessage(text);
    const messageWrapped: MessageWrapped = {
      message,
      time: Date.now()
    };
    this.messagesToEmit.emit(messageWrapped);
  }

  private async sendToMultiDevices(user: User, text: string) {
    const message: Message = {
      ...this.buildMessage(text),
      member: user.firstname ? user.firstname : AdvisorDefaultName
    };
    const messageWrapped: MessageWrapped = {
      message,
      time: Date.now()
    };
    await this.chatService.sendMessageWrapped(user.roomId, messageWrapped);
  }

  private buildMessage(text: string) {
    const date = new Date();
    return {
      time: Date.now(),
      date: date.toString(),
      hour: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
      languageOrigin: this.languageOrigin,
      languageName: this.languageName,
      flag: this.flag,
      role: this.role,
      text,
      translationMode: this.translationMode,
      isFemaleVoice: this.isFemaleSpeaking
    };
  }

  private fromAzure(language: string) {
    return environment.microsoftSpeechConfig.speechToTextEnabled && !params.excludedLanguagesFromAzureSTT.includes(language);
  }

  private async requestPermission() {
    this.track = await navigator.mediaDevices
      .getUserMedia({ audio: true });
    this.isMicrophoneGranted = true;
  }

  private stopMicrophone() {
    this.track.getTracks().forEach((track) => track.stop());
  }

  protected readonly params = params;
}
