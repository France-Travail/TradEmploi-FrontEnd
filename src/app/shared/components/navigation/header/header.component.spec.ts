import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HeaderComponent} from './header.component';
import {NavbarService} from '../../../../services/navbar.service';
import {SettingsService} from '../../../../services/settings.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {Role} from '../../../../models/role';
import {BehaviorSubject, of} from 'rxjs';
import {User} from '../../../../models/user';
import {GdprComponent} from '../../../../pages/gdpr/gdpr.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockBreakpointService;
  let mockSettingsService;

  const user = {
    connectionTime: 1,
    id: '123',
    roomId: '1345',
    role: Role.GUEST,
    firstname: 'Pôle emploi',
    isMultiDevices: true,
    email: 'test@gmail.com',
    idDGASI: '1'
  };

  beforeEach(async(() => {
    mockBreakpointService = jasmine.createSpyObj(['observe']);
    mockBreakpointService.observe.and.returnValue(of(true));
    mockSettingsService = {
      user: new BehaviorSubject<User>(user)
    };

    TestBed.configureTestingModule({
      imports: [MatDialogModule, BrowserAnimationsModule, RouterTestingModule],
      declarations: [GdprComponent],
      providers: [
        MatDialog,
        NavbarService,
        {provide: SettingsService, useValue: mockSettingsService},
        {provide: BreakpointObserver, useValue: mockBreakpointService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('test gdpr modal', () => {

    it('should open the gdpr component dialog', () => {
      spyOn(component.dialog, 'open').and.callThrough();
      component.gdpr();

      expect(component.dialog.open).toHaveBeenCalledWith(GdprComponent, {
        panelClass: 'customDialog',
        data: {
          language: component.language
        }
      });
    });

  });

});
