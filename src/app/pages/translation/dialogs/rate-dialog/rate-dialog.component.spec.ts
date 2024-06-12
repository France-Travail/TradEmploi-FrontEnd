import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

import { RateService } from '../../../../services/rate.service';
import { SettingsService } from '../../../../services/settings.service';
import { RateDialogComponent } from './rate-dialog.component';
import { ChatService } from '../../../../services/chat.service';
import { ToastService } from '../../../../services/toast.service';
import { User } from '../../../../models/user';
import { Role } from '../../../../models/role';

describe('RateDialogComponent', () => {
  let component: RateDialogComponent;
  let fixture: ComponentFixture<RateDialogComponent>;
  let mockSettingsService;
  let mockChatService;
  let mockRouter;
  let mockToastService;
  let mockRateService;
  let mockMatDialogRef;

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
    mockChatService = jasmine.createSpyObj(['getChat', 'messagesStored']);
    mockChatService.getChat.and.returnValue(of({}));
    mockChatService.messagesStored.and.returnValue([]);

    mockRouter = jasmine.createSpyObj(['navigateByUrl']);
    mockToastService = jasmine.createSpyObj(['test']);
    mockRateService = jasmine.createSpyObj(['test']);
    mockSettingsService = {
      user: new BehaviorSubject<User>(user),
      reset(){return of({}); }
    };
    mockMatDialogRef = jasmine.createSpyObj(['test']);
    TestBed.configureTestingModule({
      imports: [MatDialogModule, BrowserAnimationsModule, RouterTestingModule],
      declarations: [],
      providers: [
        MatDialog,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: Router, useValue: mockRouter },
        { provide: ChatService, useValue: mockChatService },
        { provide: SettingsService, useValue: mockSettingsService },
        { provide: RateService, useValue: mockRateService },
        { provide: ToastService, useValue: mockToastService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
