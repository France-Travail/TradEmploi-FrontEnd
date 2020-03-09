import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaugeComponent } from './gauge.component';
import { SettingsService } from 'src/app/services/settings.service';
import { AudioRecordingService } from 'src/app/services/audio-recording.service';

xdescribe('GaugeComponent', () => {
  let component: GaugeComponent;
  let settingsService: SettingsService;
  let audioRecordingService: AudioRecordingService;
  let fixture: ComponentFixture<GaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GaugeComponent, SettingsService, AudioRecordingService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
