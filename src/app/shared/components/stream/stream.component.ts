import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { AudioRecordingService } from 'src/app/services/audio-recording.service';
import { VOCABULARY_V2 } from 'src/app/data/vocabulary';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss'],
})
export class StreamComponent implements OnInit {
  @Input() duration: number;
  @Input() user: 'advisor' | 'guest';
  @Input() language: string;

  @Output() send: EventEmitter<string> = new EventEmitter<string>();
  @Output() exit: EventEmitter<void> = new EventEmitter<void>();

  public text: string = '';

  constructor(private settingsService: SettingsService, private audioRecordingService: AudioRecordingService) {}

  ngOnInit(): void {
    console.log('STREAM COMPONENT');
    this.text = 'toto';
  }

  exitAudio = () => {console.log("ExitAudio");};
}
