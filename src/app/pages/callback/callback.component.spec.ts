import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CallbackComponent } from './callback.component';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SettingsService } from '../../services/settings.service';
import { ChatService } from '../../services/chat.service';
import { TelemetryService } from '../../services/telemetry.service';
import { Role } from '../../models/role';

describe('CallbackComponent', () => {
  let component: CallbackComponent;
  let fixture: ComponentFixture<CallbackComponent>;
  let mockAuthService;
  let mockRouter;
  let mockSettingsService;
  let mockChatService;
  let mockTelemetryService;

  const user = {
    connectionTime: 1,
    id: '123',
    roomId: '1345',
    role: Role.GUEST,
    firstname: 'TRADUCTION',
    isMultiDevices: true,
    email: 'test@gmail.com',
    idDGASI: '1',
    language: { audio: 'fr-FR', written: 'fr-FR', languageName: 'Français' },
  };

  beforeEach(waitForAsync(() => {
    mockRouter = jasmine.createSpyObj(['navigateByUrl']);
    mockRouter.navigateByUrl.and.returnValue('choice');
    mockAuthService = jasmine.createSpyObj(['getRole', 'getUserInfos', 'login']);
    mockAuthService.getRole.and.returnValue(Role.ADVISOR);
    mockAuthService.getUserInfos.and.returnValue(user);
    mockSettingsService = jasmine.createSpyObj(['user']);
    mockChatService = jasmine.createSpyObj(['test']);
    mockTelemetryService = jasmine.createSpyObj(['logPeama']);

    TestBed.configureTestingModule({
      declarations: [CallbackComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useValue: mockAuthService },
        { provide: SettingsService, useValue: mockSettingsService },
        { provide: ChatService, useValue: mockChatService },
        { provide: TelemetryService, useValue: mockTelemetryService },
        {
          provide: ActivatedRoute,
          useValue: {}
        }
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
