import { NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { SettingsService } from './settings.service';
import { ToastService } from './toast.service';
import { Role } from '../models/role';

describe('AuthService', () => {
  let service: AuthService;
  const authState = {
    email: 'jane@gmail.com',
    isAnonymous: true,
    uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2'
  } as firebase.User;
  const authStub: any = {
    authState: of(authState),
    auth: {
      signInAnonymously() {
        return Promise.resolve();
      },
      signInWithEmailAndPassword() {
        return Promise.resolve();
      },
      signOut() {
        return Promise.resolve();
      },
      currentUser: {
        delete() { }
      }
    }
  };
  const toaststub = {
    showToast: jasmine.createSpy('showToast').and.callFake(() => {
      return 'true';
    })
  };
  const data = of([{ adminList: ['jane@gmail.com'] }]);
  const collectionStub = {
    valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data)
  };
  const angularFirestoreStub = {
    collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        AngularFirestore,
        SettingsService,
        { provide: AngularFireAuth, useValue: authStub },
        { provide: ToastService, useValue: toaststub },
        { provide: AngularFirestore, useValue: angularFirestoreStub }
      ],
      declarations: [],
      imports: [BrowserAnimationsModule, AngularFireModule.initializeApp(environment.firebaseConfig), AngularFireDatabaseModule, MatSnackBarModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));
  beforeEach(() => {

    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  /*
  it('should successfully login', inject([SettingsService, AngularFireAuth], async () => {
    const mock = TestBed.get(AngularFireAuth);
    const authSpy = spyOn(authStub.auth, 'signInWithEmailAndPassword').and.callFake(() => {
      return Promise.resolve({ user: { uid: '4Tl6gGYIVMeTVLPPtfMDRrkGmNd2', getIdTokenResult(){ return ''; } } });
    });
    mock.auth = authStub.auth;
    const result = await service.login('jane@gmail.com', 'abcderfs');
    expect(result).toEqual({ isAuth: true, message: 'Authentification réussie' });
    expect(authSpy).toHaveBeenCalledWith('jane@gmail.com', 'abcderfs');
  }));

  it('should fail login', async () => {
    const mock = TestBed.get(AngularFireAuth);
    const authSpy = spyOn(authStub.auth, 'signInWithEmailAndPassword').and.
      callFake(() => {
        return Promise.reject({ isAuth: false, message: 'There is no user record corresponding to this identifier. The user may have been deleted.' });
      });
    mock.auth = authStub.auth;
    await service.login('jane@gmail.com', 'abcderfs').catch(error => {
      expect(error).toEqual({ isAuth: false, message: 'There is no user record corresponding to this identifier. The user may have been deleted.' });
      expect(authSpy).toHaveBeenCalledWith('jane@gmail.com', 'abcderfs');
    });

  });

  it('should successfully login anonymously ', inject([SettingsService], async () => {
    const mock = TestBed.get(AngularFireAuth);
    const authSpy = spyOn(authStub.auth, 'signInAnonymously').and.callFake(() => {
      return Promise.resolve({ user: { uid: '12345677', getIdTokenResult(){ return ''; } } });
    });
    mock.auth = authStub.auth;
    const result = await service.loginAnonymous();
    expect(result).toEqual({ id: '12345677', isAuth: true, message: 'Authentification réussie', token: undefined, expirationTime: undefined });
    expect(authSpy).toHaveBeenCalled();
  }));

  it('should successfully login anonymously with admin config ', inject([SettingsService], async (settingsService: SettingsService) => {
    const mock = TestBed.get(AngularFireAuth);
    const authSpy = spyOn(authStub.auth, 'signInAnonymously').and.callFake(() => {
      return Promise.resolve({ user: { uid: '12345677', getIdTokenResult(){ return ''; } } });
    });
    settingsService.user.next({ connectionTime: 1, id: '123', roomId: '1345', role: Role.GUEST, firstname: 'Pôle emploi', isMultiDevices: false });
    mock.auth = authStub.auth;
    const result = await service.loginAnonymous();
    expect(result).toEqual({ id: '12345677', isAuth: true, message: 'Authentification réussie', token: undefined, expirationTime: undefined });
    expect(authSpy).toHaveBeenCalled();
  }));

  it('should successfully login anonymously with advisor config ', inject([SettingsService], async (settingsService: SettingsService) => {
    const mock = TestBed.get(AngularFireAuth);
    const authSpy = spyOn(authStub.auth, 'signInAnonymously').and.callFake(() => {
      return Promise.resolve({ user: { uid: '12345677' , getIdTokenResult(){ return ''; } } });
    });
    settingsService.user.next({ connectionTime: 1, id: '123', roomId: '1345', role: Role.GUEST, firstname: 'Pôle emploi', isMultiDevices: true });
    collectionStub.valueChanges.and.callFake(() => {
      return of([{ adminList: [], advisors: ['jane@gmail.com'] }]);
    });
    mock.auth = authStub.auth;
    const result = await service.loginAnonymous();
    expect(result).toEqual({ id: '12345677', isAuth: true, message: 'Authentification réussie', token: undefined, expirationTime: undefined });
    expect(authSpy).toHaveBeenCalled();
  }));
 **/
  it('should successfully login anonymously with guest config ', inject([SettingsService], async (settingsService: SettingsService) => {
    const mock = TestBed.get(AngularFireAuth);
    const authSpy = spyOn(authStub.auth, 'signInAnonymously').and.callFake(() => {
      return Promise.resolve({ user: { uid: '12345677', getIdTokenResult(){ return ''; } } });
    });
    settingsService.user.next({ connectionTime: 1, id: '123', roomId: '1345', role: Role.GUEST, firstname: 'Pôle emploi', isMultiDevices: true });
    collectionStub.valueChanges.and.callFake(() => {
      return of([{ adminList: [], advisors: [] }]);
    });
    mock.auth = authStub.auth;
    const result = await service.loginAnonymous();
    expect(result).toEqual({ id: '12345677', isAuth: true, message: 'Authentification réussie', token: undefined, expirationTime: undefined });
    expect(authSpy).toHaveBeenCalled();
  }));

  /*
  it('should fail login anonymously', async () => {
    const mock = TestBed.get(AngularFireAuth);
    const authSpy = spyOn(authStub.auth, 'signInAnonymously').and
      .callFake(() => {
        return Promise.reject({ isAuth: false, message: 'There is no user record corresponding to this identifier. The user may have been deleted.' });
      });
    mock.auth = authStub.auth;
    await service.loginAnonymous().catch(error => {
      expect(authSpy).toHaveBeenCalled();
      expect(error).toEqual({ id: '', isAuth: false, message: 'There is no user record corresponding to this identifier. The user may have been deleted.' });
    });
  });

  it('should logout successfully', inject([SettingsService], async (settingsService: SettingsService) => {
    const mock = TestBed.get(AngularFireAuth);
    settingsService.user.next({ ...settingsService.user.value, role: Role.GUEST, firstname: 'Pôle emploi', isMultiDevices: true });
    spyOn(authStub.auth.currentUser, 'delete').and.callFake(() => {
      return Promise.resolve();
    });
    const authSpy = spyOn(authStub.auth, 'signOut').and.callFake(() => {
      return Promise.resolve();
    });
    mock.auth = authStub.auth;
    const result = await service.logout();
    expect(result).toEqual({ isAuth: false, message: 'Déconnexion réussie' });
    expect(authSpy).toHaveBeenCalled();
  }));

  it('should fail logout', inject([SettingsService], async (settingsService: SettingsService) => {
    const mock = TestBed.get(AngularFireAuth);
    mock.auth = authStub.auth;
    settingsService.user.next({ ...settingsService.user.value, role: Role.GUEST, firstname: 'Pôle emploi', isMultiDevices: true });
    const authSpy = spyOn(authStub.auth, 'signOut').and.callFake(() => {
      return Promise.reject({ isAuth: false, message: 'Déconnexion échouée' });
    });
    await service.logout().catch(err => {
      expect(authSpy).toHaveBeenCalled();
      expect(err).toEqual({ isAuth: true, message: 'Déconnexion échouée' });
    });
  }));

  it('should fail user delete ', inject([SettingsService], async (settingsService: SettingsService) => {
    const mock = TestBed.get(AngularFireAuth);
    mock.auth = authStub.auth;
    settingsService.user.next({ ...settingsService.user.value, role: Role.GUEST, firstname: 'Pôle emploi', isMultiDevices: true });
    const authSpy = spyOn(authStub.auth.currentUser, 'delete').and.
      callFake(() => {
        return Promise.reject({ isAuth: false, message: 'Déconnexion échouée' });
      });
    await service.logout().catch(err => {
      expect(authSpy).toHaveBeenCalled();
      expect(err).toEqual({ isAuth: true, message: 'Déconnexion échouée' });
    });
  }));
*/
});
