import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BehaviorSubject, of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';
import { Role } from '../../models/role';
import { User } from '../../models/user';
import { GdprComponent } from '../gdpr/gdpr.component';
import { NavbarService } from '../../services/navbar.service';
import { SettingsService } from '../../services/settings.service';
import { TranslationComponent } from './translation.component';
import { ToastService } from '../../services/toast.service';
import { TextToSpeechService } from '../../services/text-to-speech.service';
import { TranslateService } from '../../services/translate.service';
import { CryptService } from '../../services/crypt.service';

describe('TranslationComponent', () => {
  let component: TranslationComponent;
  let fixture: ComponentFixture<TranslationComponent>;
  let mockBreakpointService;
  let mockSettingsService;
  let mockChatService;
  let mockRouter;

  let mockToastService;
  let mockTextToSpeechService;
  let mockNavbarService;
  let mockTranslateService;
  let mockCryptService;

  const user = {
    connectionTime: 1,
    id: '123',
    roomId: '1345',
    role: Role.GUEST,
    firstname: 'Pôle emploi',
    isMultiDevices: true,
    email: 'test@gmail.com',
    idDGASI: '1',
    language: { audio: 'fr-FR', written: 'fr-FR', languageName: 'Français' }
  };

  beforeEach(async(() => {
    mockChatService = jasmine.createSpyObj(['getChat', 'messagesStored']);
    mockChatService.getChat.and.returnValue(of({}));
    mockChatService.messagesStored.and.returnValue([]);
    mockBreakpointService = jasmine.createSpyObj(['observe']);
    mockBreakpointService.observe.and.returnValue(of(true));
    mockSettingsService = {
      user: new BehaviorSubject<User>(user),
      reset(){return of({}); }
    };
    mockRouter = jasmine.createSpyObj(['navigateByUrl']);

    mockToastService = jasmine.createSpyObj(['navigateByUrl']);
    mockTextToSpeechService = jasmine.createSpyObj(['navigateByUrl']);
    mockNavbarService = jasmine.createSpyObj(['show', 'handleTabsTranslation']);
    mockTranslateService = jasmine.createSpyObj(['navigateByUrl']);
    mockCryptService = jasmine.createSpyObj(['navigateByUrl']);

    TestBed.configureTestingModule({
      imports: [MatDialogModule, BrowserAnimationsModule, RouterTestingModule],
      declarations: [GdprComponent],
      providers: [
        MatDialog,
        NavbarService,
        { provide: Router, useValue: mockRouter },
        { provide: ChatService, useValue: mockChatService },
        { provide: SettingsService, useValue: mockSettingsService },
        { provide: BreakpointObserver, useValue: mockBreakpointService },

        { provide: ToastService, useValue: mockToastService },
        { provide: TextToSpeechService, useValue: mockTextToSpeechService },
        { provide: NavbarService, useValue: mockNavbarService },
        { provide: TranslateService, useValue: mockTranslateService },
        { provide: CryptService, useValue: mockCryptService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
