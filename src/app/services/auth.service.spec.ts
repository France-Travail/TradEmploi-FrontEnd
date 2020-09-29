import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, inject, TestBed } from '@angular/core/testing';
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
import { User } from '../models/user';
import { Role } from '../models/role';

describe('AuthService', () => {
  let service: AuthService;
  const authState = {
    email: "jane@gmail.com",
    isAnonymous: true,
    uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2'
  } as firebase.User;
  let authStub: any = {
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
      }
    }
  };
  let toaststub = {
    showToast: jasmine.createSpy('showToast').and.callFake(() => {
      return "true"
    })
  }
  const data = of(undefined);
  const collectionStub = {
    valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data)
  }
  const angularFiresotreStub = {
    collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        AngularFirestore,
        SettingsService,
        { provide: AngularFireAuth, useValue: authStub },
        { provide: ToastService, useValue: toaststub },
        { provide: AngularFirestore, useValue: angularFiresotreStub }
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

  it('should fail on finding user', inject([SettingsService], async (settingsService: SettingsService) => {
    settingsService.user.next({ firstname: "notExisted", role:"GUEST" } as User)
    expect(angularFiresotreStub.collection).toHaveBeenCalledWith('config');
    expect(toaststub.showToast).toHaveBeenCalled();
  }));

  xit('should initialise an admin', inject([SettingsService], async (settingsService: SettingsService) => {
    collectionStub.valueChanges.and.callFake(() => {
      return of([{ adminList: ["jane@gmail.com"] }])
    })
    expect(angularFiresotreStub.collection).toHaveBeenCalledWith('config');
    expect(settingsService.user.value.role).toEqual(Role.ADMIN);
  }));

  xit('should initialise an advisor', inject([SettingsService], async (settingsService: SettingsService) => {
    collectionStub.valueChanges.and.callFake(() => {
      return of([{"adminList":[ ],"advisors":["jane@gmail.com","agent-test@pe.fr"]}])
    })
    expect(angularFiresotreStub.collection).toHaveBeenCalledWith('config');
    expect(settingsService.user.value.role).toEqual("ADVISOR");
  }));

  it('should initialise an visitor', inject([SettingsService], async (settingsService: SettingsService) => {
    collectionStub.valueChanges.and.callFake(() => {
      return of([{"adminList":["admin@pe.fr","admin-test@pe.fr"],"advisors":["agent@pe.fr","agent-test@pe.fr"]}])
    })
    console.log(settingsService.user)
    expect(angularFiresotreStub.collection).toHaveBeenCalledWith('config');
    expect(settingsService.user.value.role).toEqual("GUEST");
  }))


  it('should successfully login', inject([SettingsService], async (settingsService: SettingsService) => {
    const mock = TestBed.get(AngularFireAuth);
    let userCredentials;
    userCredentials = { "user": { "uid": "4Tl6gGYIVMeTVLPPtfMDRrkGmNd2", "displayName": null, "photoURL": null, "email": "agent@pe.fr", "emailVerified": false, "phoneNumber": null, "isAnonymous": false, "tenantId": null, "providerData": [{ "uid": "agent@pe.fr", "displayName": null, "photoURL": null, "email": "agent@pe.fr", "phoneNumber": null, "providerId": "password" }] }, "credential": null, "additionalUserInfo": { "providerId": "password", "isNewUser": false, "profile": '' }, "operationType": "signIn" }
    settingsService.user.next({ ...settingsService.user.value, firstname: 'Pôle emploi' });
    const authSpy = spyOn(authStub.auth, 'signInWithEmailAndPassword').and.callFake(function (email, password) {
      return Promise.resolve(userCredentials);
    });
    mock.auth = authStub.auth;
    const result = await service.login('jane@gmail.com', 'abcderfs')
    expect(result).toEqual({ isAuth: true, message: 'Authentification réussie' });
    expect(authSpy).toHaveBeenCalledWith('jane@gmail.com', 'abcderfs');
  }));

  it('should fail login', async () => {
    const mock = TestBed.get(AngularFireAuth);
    const authSpy = spyOn(authStub.auth, 'signInWithEmailAndPassword').and.
      callFake(function () {
        const p = Promise.reject({ isAuth: false, message: 'There is no user record corresponding to this identifier. The user may have been deleted.' });
        return p
      })
    mock.auth = authStub.auth;
    await service.login('jane@gmail.com', 'abcderfs').catch(error => {
      expect(error).toEqual({ isAuth: false, message: 'There is no user record corresponding to this identifier. The user may have been deleted.' });
      expect(authSpy).toHaveBeenCalledWith('jane@gmail.com', 'abcderfs');

    })

  });

  it('should successfully login anonymously ', inject([SettingsService], async (settingsService: SettingsService) => {
    const mock2 = TestBed.get(AngularFireAuth);
    let userCredentials;
    userCredentials = { "user": { "delete": function () { return true }, "uid": "12345677", "displayName": null, "photoURL": null, "email": "agent@pe.fr", "emailVerified": false, "phoneNumber": null, "isAnonymous": false, "tenantId": null, "providerData": [{ "uid": "agent@pe.fr", "displayName": null, "photoURL": null, "email": "agent@pe.fr", "phoneNumber": null, "providerId": "password" }] }, "credential": null, "additionalUserInfo": { "providerId": "password", "isNewUser": false, "profile": '' }, "operationType": "signIn" }
    const authSpy = spyOn(authStub.auth, 'signInAnonymously').and.callFake(function () {
      return Promise.resolve(userCredentials);
    });
    mock2.auth = authStub.auth;
    const result = await service.loginAnonymous()
    expect(result).toEqual({ id: "12345677", isAuth: true, message: 'Authentification réussie' });
    expect(authSpy).toHaveBeenCalled();
  }));

  it('should fail login anonymously', async () => {
    const mock1 = TestBed.get(AngularFireAuth);
    const authSpy = spyOn(authStub.auth, 'signInAnonymously').and
      .callFake(function () {
        const p = Promise.reject({ isAuth: false, message: 'There is no user record corresponding to this identifier. The user may have been deleted.' });
        return p
      });
    mock1.auth = authStub.auth;
    await service.loginAnonymous().catch(error => {
      expect(authSpy).toHaveBeenCalled();
      expect(error).toEqual({ isAuth: false, message: 'There is no user record corresponding to this identifier. The user may have been deleted.' });
    });
  });

  it('should logout successfully', async () => {
    const mock2 = TestBed.get(AngularFireAuth);
    const authSpy = spyOn(authStub.auth, 'signOut').and.callFake(function () {
      return Promise.resolve();
    });
    mock2.auth = authStub.auth;
    const result = await service.logout()

    expect(result).toEqual({ isAuth: false, message: 'Déconnexion réussie' });
    expect(authSpy).toHaveBeenCalled();
  });

  it('should fail logout', async () => {
    const mock4 = TestBed.get(AngularFireAuth);
    mock4.auth = authStub.auth;
    const authSpy = spyOn(authStub.auth, 'signOut').and.
      callFake(() => {
        const p = Promise.reject({ isAuth: false, message: 'Déconnexion échouée' });
        return p
      });
    await service.logout().catch(err => {
      expect(authSpy).toHaveBeenCalled();
      expect(err).toEqual({ isAuth: true, message: 'Déconnexion échouée' });
    });

  });


});
