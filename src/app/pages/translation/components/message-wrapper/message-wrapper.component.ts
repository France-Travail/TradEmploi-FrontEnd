import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { VOCABULARY_V2 } from 'src/app/data/vocabulary';
import { TranslateService } from 'src/app/services/translate.service';
import { SettingsService } from 'src/app/services/settings.service';
import { AudioRecordingService } from 'src/app/services/audio-recording.service';
import { TextToSpeechService } from 'src/app/services/text-to-speech.service';
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
  public languageOrigin: string;

  public rawSpeech: HTMLAudioElement;
  public translatedSpeech: HTMLAudioElement;
  public rawText: string = '';
  public translatedText: string = '';
  public isSetLanguage = VOCABULARY_V2.some(item => item.isoCode === this.settingsService.guest.value.language);
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
    public router: Router
  ) {}

  ngOnInit(): void {
    this.languageOrigin = this.user === 'advisor' ? this.settingsService.advisor.language : this.settingsService.guest.value.language;
    let sentences = this.isSetLanguage || this.user === 'advisor' ? VOCABULARY_V2.find(item => item.isoCode === this.languageOrigin).sentences : this.generateSentence(this.languageOrigin);
    this.title = sentences.find(s => s.key === 'translation-h2').value;
    this.sendBtnValue = sentences.find(s => s.key === 'send').value;
    this.listenBtnValue = sentences.find(s => s.key === 'listen').value;
    this.flag = sentences.find(s => s.key === 'flag').value.toLowerCase();
    this.language = this.user === 'guest' ? 'fr-FR' : this.settingsService.guest.value.language;
  }

  public async talk(): Promise<void> {
    if ('webkitSpeechRecognition' in window) {
      this.micro = true;
    } else {
      this.toastService.showToast("L'accès au microphone n'est pas autorisé.");
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
    } else {
      this.rawText = message;
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
      this.audioRecordingService.audioSpeech.play();
    } else {
      this.translatedSpeech.play();
    }
  }

  public audioSending(message: string): void {
    this.micro = false;
    this.isReady.listenSpeech = true;
    this.send(false, message);
  }

  public exitRecord() {
    this.micro = false;
  }
  public generateSentence(language: string): { key: string; value: string }[] {
    return [
      { key: 'flag', value: language.split('-')[1] },
      { key: 'application-name', value: 'Instant Translation' },
      { key: 'send', value: 'Send' },
      { key: 'translate', value: 'Translate' },
      { key: 'translation-h2', value: 'Type a text' },
      { key: 'rate', value: 'Are you satisfied with your interview?' },
      { key: 'thanks', value: 'Pôle Emploi thanks you.' },
      { key: 'listen', value: 'Listen' },
      { key: 'record-text', value: 'Speak now' }
    ];
  }
}
