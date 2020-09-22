import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RecordComponent } from './record.component';
import { AudioRecordingService } from 'src/app/services/audio-recording.service';
import { By } from '@angular/platform-browser';
import { MatDialogModule, MatSnackBar } from '@angular/material';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { SettingsMockService } from 'src/app/mocks/setting.service.mock';

describe('RecordComponent', () => {
  let component: RecordComponent;
  let fixture: ComponentFixture<RecordComponent>;
  const audioRecordingService: AudioRecordingService = new AudioRecordingService();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [RecordComponent],
      providers: [AudioRecordingService,
        MatSnackBar,
        AngularFirestore,
        {provide: SettingsService, useClass: SettingsMockService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordComponent);
    component = fixture.componentInstance;
    component.duration = 5;
    fixture.detectChanges();
  });

  xit('text property should equal to Parlez maintenant', async () => {
    expect(component.text).toEqual('Parlez maintenant');
  });

  xit('should display Parlez maintenant in HTML', async () => {
    expect(fixture.nativeElement.querySelector('p').textContent).toEqual('Parlez maintenant');
  });

  xit('should start with bar 0%', async () => {
    const bar = fixture.debugElement.query(By.css('.bar'));
    expect(bar.styles.cssText).toEqual('width: 0%;');
  });

  xit('should pause on pauseOrResume', () => {
    component.pauseOrResume();
    expect(component.isPaused).toEqual(true);
  });

  xit('should resume on pauseOrResume', () => {
    component.isPaused = true;
    fixture.detectChanges();
    component.pauseOrResume();
    expect(component.isPaused).toEqual(false);
  });

  xit('should emit exit on exitAudio', async done => {
    component.intervalId = undefined;
    component.exit.subscribe(value => {
      expect(value).toEqual(undefined);
      done();
    });
    component.exitAudio();
  });

  xit('should emit send true on timeOut', async done => {
    component.intervalId = undefined;
    component.exit.subscribe(value => {
      expect(value).toEqual(false);
      done();
    });
    component.sendSpeech();
  });
});
