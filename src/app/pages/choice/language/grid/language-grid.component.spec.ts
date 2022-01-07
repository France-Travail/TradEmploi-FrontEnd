import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../../../../services/settings.service';
import { ToastService } from '../../../../services/toast.service';
import { User } from '../../../../models/user';
import { Role } from '../../../../models/role';
import { LanguageGridComponent } from './language-grid.component';
import { TextToSpeechService } from '../../../../services/text-to-speech.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';

describe('LanguageGridComponent', () => {
  let component: LanguageGridComponent;
  let fixture: ComponentFixture<LanguageGridComponent>;
  let mockSettingsService;
  let mockRouter;
  let mockToastService;
  let mockTextToSpeechService;

  const data = of([{ adminList: ['jane@gmail.com'] }]);
  const collectionStub = {
    valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data)
  };
  const angularFirestoreStub = {
    collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
  };

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
    mockRouter = jasmine.createSpyObj(['navigateByUrl']);
    mockToastService = jasmine.createSpyObj(['test']);
    mockTextToSpeechService = jasmine.createSpyObj(['test']);
    mockSettingsService = {
      user: new BehaviorSubject<User>(user),
      reset() {
        return of({});
      }
    };
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, RouterTestingModule, AngularFireDatabaseModule],
      declarations: [],
      providers: [
        { provide: AngularFirestore, useValue: angularFirestoreStub },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: Router, useValue: mockRouter },
        { provide: TextToSpeechService, useValue: mockTextToSpeechService },
        { provide: SettingsService, useValue: mockSettingsService },
        { provide: ToastService, useValue: mockToastService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
