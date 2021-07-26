import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {BehaviorSubject, of} from 'rxjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ModalityComponent} from './modality.component';
import {ChatService} from '../../services/chat.service';
import {Router} from '@angular/router';
import {Role} from '../../models/role';
import {User} from '../../models/user';
import {GdprComponent} from '../gdpr/gdpr.component';
import {NavbarService} from '../../services/navbar.service';
import {SettingsService} from '../../services/settings.service';

describe('ModalityComponent', () => {
  let component: ModalityComponent;
  let fixture: ComponentFixture<ModalityComponent>;
  let mockBreakpointService;
  let mockSettingsService;
  let mockChatService;
  let mockRouter;

  const user = {
    connectionTime: 1,
    id: '123',
    roomId: '1345',
    role: Role.GUEST,
    firstname: 'Pôle emploi',
    isMultiDevices: true,
    language: null
  };

  beforeEach(async(() => {
    mockChatService = jasmine.createSpyObj(['messagesStored', 'initChatMulti']);
    mockBreakpointService = jasmine.createSpyObj(['observe']);
    mockBreakpointService.observe.and.returnValue(of(true));
    mockSettingsService = {
      user: new BehaviorSubject<User>(user),
      defaultLanguage: {written: '', audio: '', languageName: ''}
    };
    mockRouter = jasmine.createSpyObj(['navigateByUrl']);

    TestBed.configureTestingModule({
      imports: [MatDialogModule, BrowserAnimationsModule, RouterTestingModule],
      declarations: [GdprComponent],
      providers: [
        MatDialog,
        NavbarService,
        {provide: Router, useValue: mockRouter},
        {provide: ChatService, useValue: mockChatService},
        {provide: SettingsService, useValue: mockSettingsService},
        {provide: BreakpointObserver, useValue: mockBreakpointService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('mono mode connection', () => {

    it('when we confirm the mono mode connection, we should go to the language choice page', () => {
      component.confirm();
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('choice');
    });

  });

  describe('multi mode connection', () => {

    it('when we confirm the mono mode connection, we should go to the translation page', () => {
      component.target = 'multi';
      component.confirm();
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('translation');
    });

  });

});
