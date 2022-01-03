import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SettingsService } from '../../../../services/settings.service';
import { AudioRecordingService } from '../../../../services/audio-recording.service';
import { ToastService } from '../../../../services/toast.service';
import { VOCABULARY } from '../../../../data/vocabulary';
import { Vocabulary } from '../../../../models/vocabulary';
import { Role } from '../../../../models/role';
import { ERROR_FUNC_NOSOUND, ERROR_FUNC_STT } from '../../../../models/error/errorFunctionnal';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss'],
})
export class RecordComponent implements OnInit {
  @Input() duration: number;
  @Input() role: string;
  @Input() language: string;
  @Input() flag: string;

  @Output() send: EventEmitter<string> = new EventEmitter<string>();
  @Output() exit: EventEmitter<void> = new EventEmitter<void>();

  public text: string = '';
  public width: number = 0;
  public seconds: number = 50;
  public isPaused: boolean = false;
  public intervalId: any;
  public canSend: boolean = false;
  public inProgress: boolean = false;

  constructor(private readonly settingsService: SettingsService,
              private readonly audioRecordingService: AudioRecordingService,
              private readonly toastService: ToastService) { }


  ngOnInit(): void {
    this.start();
  }

  start = async (): Promise<void> => {
    this.putTitle();
    this.record();
    this.recordBarLoad();
  }

  record = () => {
    this.audioRecordingService.language = this.language;
    this.audioRecordingService.start();
  }

  putTitle = () => {
    const language: string = this.role === Role.ADVISOR ? this.settingsService.defaultLanguage.audio : this.settingsService.user.value.language.audio;
    const audioCode: Vocabulary = VOCABULARY.find((item) => item.audioCode === language);
    this.text = audioCode ? audioCode.sentences.recordText : VOCABULARY.find((item) => item.isoCode === language).sentences.recordText;
  }

  private recordBarLoad = () => {
    const value: number = 100 / (this.duration * 10);
    let time: number = 0;
    this.intervalId = setInterval(() => {
      if (!this.isPaused) {
        this.width = this.width + value;
        time += 100;
      }
      if (time === 1000) {
        this.seconds--;
        time = 0;
      }
      if (this.seconds < 48) {
        this.canSend = true;
      }
      if (this.width > 100) {
        this.width = 100;
      }

      if (this.width >= 100) {
        this.exitAudio();
      }
    }, 100);
  }

  pauseOrResume = () => {
    this.isPaused = !this.isPaused;
  }

  exitAudio = async () => {
    if (this.intervalId !== undefined) {
      this.stopRecord();
      this.exit.emit();
    }
  }

  retry = async (): Promise<void> => {
    if (this.intervalId !== undefined) {
      this.stopRecord();
    }
    this.seconds = 0;
    this.start();
  }

  sendSpeech = async (): Promise<void> => {
    this.inProgress = true;
    if (this.intervalId !== undefined) {
      this.stopRecord();
      this.audioRecordingService.speechToText.subscribe(
        (response) => {
          this.inProgress = false;
          if (response === ''){
            this.toastService.showToast(ERROR_FUNC_NOSOUND.description, 'toast-error');
          }
          this.send.emit(response);
        },
        (_) => {
          this.inProgress = false;
          this.toastService.showToast(ERROR_FUNC_STT.description, 'toast-error');
          this.send.emit('');
        }
      );
    }
  }

  private stopRecord = () => {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
    this.audioRecordingService.stop(this.seconds);
  }
}
