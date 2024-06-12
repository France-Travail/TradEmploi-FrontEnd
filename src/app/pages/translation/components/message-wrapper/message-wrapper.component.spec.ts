import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Router } from '@angular/router';
import { ToastService } from '../../../../services/toast.service';
import { AudioRecordingService } from '../../../../services/audio-recording.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SpeechRecognitionService } from '../../../../services/speech-recognition.service';
import { ErrorService } from '../../../../services/error.service';
import { SpeechToTextMicrosoftService } from '../../../../services/speech-to-text-microsoft';
import { MessageWrapperComponent } from './message-wrapper.component';
import { SettingsService } from '../../../../services/settings.service';
import { ChatService } from '../../../../services/chat.service';
import { Role } from '../../../../models/role';
import { BehaviorSubject, of } from 'rxjs';
import { User } from '../../../../models/user';

describe('MessageWrapperComponent', () => {
  let component: MessageWrapperComponent;
  let fixture: ComponentFixture<MessageWrapperComponent>;
  let mockRouter;
  let mockSettingsService;
  let mockChatService;

  let mockToastService;
  let mockAudioRecordingService;
  let mockBreakpointObserver;
  let mockSpeechRecognitionService;
  let mockErrorService;
  let mockSpeechToTextMicrosoftService;

  const user = {
    connectionTime: 1,
    id: '123',
    roomId: '1345',
    role: Role.GUEST,
    firstname: 'TRADUCTION',
    isMultiDevices: true,
    email: 'test@gmail.com',
    idDGASI: '1',
    language: { audio: 'fr-FR', written: 'fr-FR', languageName: 'Français' }
  };

  beforeEach(waitForAsync(() => {
    mockSettingsService = jasmine.createSpyObj(['user']);
    mockSettingsService.user = new BehaviorSubject<User>(user);
    mockBreakpointObserver = jasmine.createSpyObj(['observe']);
    mockBreakpointObserver.observe.and.returnValue(of({}));
    mockChatService = jasmine.createSpyObj(['test']);

    TestBed.configureTestingModule({
      declarations: [MessageWrapperComponent],
      providers: [
        { provide: ToastService, useValue: mockToastService },
        { provide: SettingsService, useValue: mockSettingsService },
        { provide: AudioRecordingService, useValue: mockAudioRecordingService },
        { provide: BreakpointObserver, useValue: mockBreakpointObserver },
        { provide: SpeechRecognitionService, useValue: mockSpeechRecognitionService },
        { provide: ErrorService, useValue: mockErrorService },
        { provide: SpeechToTextMicrosoftService, useValue: mockSpeechToTextMicrosoftService },
        { provide: Router, useValue: mockRouter },
        { provide: ChatService, useValue: mockChatService }
      ]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
