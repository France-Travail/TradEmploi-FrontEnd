import { componentFactoryName } from '@angular/compiler';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, inject, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBarModule } from '@angular/material';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AuthService } from './auth.service';
import { SettingsService } from './settings.service';

describe('AuthService', () => {
  let service: AuthService;
  let authState: firebase.User = null;
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


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        AngularFirestore,
        SettingsService,
        { provide: AngularFireAuth, useValue: authStub },
      ],
      declarations: [],
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig), AngularFireDatabaseModule, MatSnackBarModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });


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

  xit('should fail login', async () => {
    const mock = TestBed.get(AngularFireAuth);
    let userCredentials;
    userCredentials = { "user": { "uid": "4Tl6gGYIVMeTVLPPtfMDRrkGmNd2", "displayName": null, "photoURL": null, "email": "agent@pe.fr", "emailVerified": false, "phoneNumber": null, "isAnonymous": false, "tenantId": null, "providerData": [{ "uid": "agent@pe.fr", "displayName": null, "photoURL": null, "email": "agent@pe.fr", "phoneNumber": null, "providerId": "password" }] }, "credential": null, "additionalUserInfo": { "providerId": "password", "isNewUser": false, "profile": '' }, "operationType": "signIn" }
    const authSpy = spyOn(authStub.auth, 'signInWithEmailAndPassword').and.
      callFake(function (email, password) {
        return Promise.reject('There is no user record corresponding to this identifier. The user may have been deleted.')
      })
    mock.auth = authStub.auth;
    const result = await service.login('jane@gmail.com', 'abcderfs')
    console.log(result)
    expect(result).toEqual({ isAuth: false, message: 'There is no user record corresponding to this identifier. The user may have been deleted.' });
    expect(authSpy).toHaveBeenCalledWith('jane@gmail.com', 'abcderfs');
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

  xit('should fail login anonymously', async () => {
    const mock1 = TestBed.get(AngularFireAuth);
    const authSpy = spyOn(authStub.auth, 'signInAnonymously').and
      .callFake(function () {
        Promise.reject({});
      });
    mock1.auth = authStub.auth;
    const result = await service.loginAnonymous()
    // expect(authSpy).toHaveBeenCalled();
    expect(result).toEqual({ id: null, isAuth: false, message: 'There is no user record corresponding to this identifier. The user may have been deleted.' });
  });

  it('should logout successfully', inject([SettingsService], async (settingsService: SettingsService) => {
    const mock2 = TestBed.get(AngularFireAuth);
    const authSpy = spyOn(authStub.auth, 'signOut').and.callFake(function () {
      return Promise.resolve();
    });
    mock2.auth = authStub.auth;
    const result = await service.logout()
    expect(result).toEqual({ isAuth: false, message: 'Déconnexion réussie' });
    expect(authSpy).toHaveBeenCalled();
  }));

  it('should fail logout', async () => {
    const mock2 = TestBed.get(AngularFireAuth);
    const authSpy = spyOn(authStub.auth, 'signOut').and.callFake(() => {
      return Promise.reject({ isAuth: true, message: 'Déconnexion echouée' });
    });
    mock2.auth = authStub.auth;
    const result = await service.logout();
    console.log(result)
   // expect(result).toEqual({ isAuth: true, message: 'Déconnexion echouée' });
    expect(authSpy).toHaveBeenCalled();
  });

  // it('should return admin', () => {


  // });

  // it('should return advisor', () => {

  // });

  // it('should return guest', () => {

  // });
});
