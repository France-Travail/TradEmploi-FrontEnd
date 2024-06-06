import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
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
import { TextToSpeechGcpService } from '../../../../services/text-to-speech-gcp.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import {TextToSpeechService} from "../../../../services/text-to-speech.service";

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
    firstname: 'SNCF',
    isMultiDevices: true,
    email: 'test@gmail.com',
    idDGASI: '1',
    language: { audio: 'fr-FR', written: 'fr-FR', languageName: 'Français' }
  };
  beforeEach(waitForAsync(() => {
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
      imports: [BrowserAnimationsModule, RouterTestingModule, AngularFireDatabaseModule, MatDialogModule],
      declarations: [],
      providers: [
        { provide: AngularFirestore, useValue: angularFirestoreStub },
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
