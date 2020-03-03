import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VOCABULARY_V2 } from 'src/app/data/vocabulary';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss']
})
export class GaugeComponent implements OnInit {
  @Input() duration: number;
  @Input() user: 'advisor' | 'guest';

  @Output() send: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() exit: EventEmitter<null> = new EventEmitter<null>();

  public text: string = '';
  public width: number = 0;
  public seconds: number = 0;
  public isPaused: boolean = false;

  private intervalId: any;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    if (this.user === 'advisor') {
      this.text = VOCABULARY_V2.find(item => item.isoCode === this.settingsService.advisor.language).sentences.find(s => s.key === 'gauge-text').value;
    } else {
      this.text = VOCABULARY_V2.find(item => item.isoCode === this.settingsService.guest.value.language).sentences.find(s => s.key === 'gauge-text').value;
    }
    this.start();
  }

  /**
   * Starts filling the bar
   */
  public start(): void {
    const value: number = 100 / (this.duration * 10);
    let time: number = 0;

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
  public sendEvent(): void {
    clearInterval(this.intervalId);
    this.send.emit(false);
  }

  /**
   * Called when user clicks the exit button
   */
  public exitEvent(): void {
    clearInterval(this.intervalId);
    this.exit.emit();
  }

  /**
   * Called when user wants to retry the record
   */
  public retry(): void {
    clearInterval(this.intervalId);
    this.width = 0;
    this.seconds = 0;
    this.start();
  }

  /**
   * Called when the gauge is full
   */
  private timeOut(): void {
    clearInterval(this.intervalId);
    this.send.emit(true);
  }
}
