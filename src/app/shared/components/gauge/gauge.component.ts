import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { AudioRecordingService } from 'src/app/services/audio-recording.service';
import { VOCABULARY_V2 } from 'src/app/data/vocabulary';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss']
})
export class GaugeComponent implements OnInit {
  @Input() duration: number;
  @Input() user: 'advisor' | 'guest';

  @Output() send: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() exit: EventEmitter<void> = new EventEmitter<void>();

  public text: string = '';
  public width: number = 0;
  public seconds: number = 0;
  public isPaused: boolean = false;

  public intervalId: any;

  constructor(private settingsService: SettingsService, private audioRecordingService: AudioRecordingService) {}

  ngOnInit(): void {
    const language = this.user === 'advisor' ? this.settingsService.advisor.language : this.settingsService.guest.value.language;
    this.text = VOCABULARY_V2.find(item => item.isoCode === language).sentences.find(s => s.key === 'gauge-text').value;
    this.start();
  }

  /**
   * Starts filling the bar
   */
  public async start(): Promise<void> {
    const value: number = 100 / (this.duration * 10);
    let time: number = 0;
    console.log('START GAUGE');
    await this.audioRecordingService.record('start');
    this.intervalId = setInterval(() => {
      if (!this.isPaused) {
        this.width = this.width + value;
        time += 100;
      }
      if (time === 1000) {
        this.seconds++;
        time = 0;
      }

      if (this.width > 100) {
        this.width = 100;
      }

      if (this.width >= 100) {
        this.timeOut();
      }
    }, 100);
  }

  /**
   * Pause or resume the filling
   */
  public pauseOrResume(): void {
    this.isPaused = !this.isPaused;
  }

  /**
   * Called when user clicks the send button
   */
  public async sendSpeech(): Promise<void> {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
    console.log('STOP GAUGE');
    await this.audioRecordingService.record('stop');
    this.send.emit(false);
  }

  /**
   * Called when user clicks the exit button
   */
  public async exitAudio(): Promise<void> {
    if (this.intervalId !== undefined) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
      console.log('STOP GAUGE');
      await this.audioRecordingService.record('stop');
    }
    this.exit.emit();
  }

  /**
   * Called when user wants to retry the record
   */
  public async retry(): Promise<void> {
    if (this.intervalId !== undefined) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
      console.log('STOP GAUGE');
      await this.audioRecordingService.record('stop');
    }
    this.width = 0;
    this.seconds = 0;
    this.start();
  }

  /**
   * Called when the gauge is full
   */
  private async timeOut(): Promise<void> {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
    console.log('STOP GAUGE');
    await this.audioRecordingService.record('stop');
    this.send.emit(true);
  }
}
