import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CallbackComponent } from './callback.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SettingsService } from '../../services/settings.service';
import { ChatService } from '../../services/chat.service';
import { TelemetryService } from '../../services/telemetry.service';
import { Role } from '../../models/role';

describe('CallbackComponent', () => {
  let component: CallbackComponent;
  let fixture: ComponentFixture<CallbackComponent>;
  let mockAuthService;

  beforeEach(waitForAsync(() => {
    const mockRouter = jasmine.createSpyObj(['test']);
    mockAuthService = jasmine.createSpyObj(['getRole']);
    mockAuthService.getRole.and.returnValue(Role.ADVISOR);
    const mockSettingsService = jasmine.createSpyObj(['test']);
    const mockChatService = jasmine.createSpyObj(['test']);
    const mockTelemetryService = jasmine.createSpyObj(['test']);

    TestBed.configureTestingModule({
      declarations: [CallbackComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useValue: mockAuthService },
        { provide: SettingsService, useValue: mockSettingsService },
        { provide: ChatService, useValue: mockChatService },
        { provide: TelemetryService, useValue: mockTelemetryService }
      ]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
});
