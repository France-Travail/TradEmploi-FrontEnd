import {Role} from '../models/role';
import {Injectable} from '@angular/core';
import {FbAuthSingleton} from '../models/token/FbAuthSingleton';
import {SettingsService} from './settings.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly afAuth: AngularFireAuth, private readonly settingsService: SettingsService) {
  }

  public login(email: string, password: string, firebaseLogin = false): Promise<{ isAuth: boolean; message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        let auth;
        const signInMethodsForEmail = await this.afAuth.fetchSignInMethodsForEmail(email);
        if (signInMethodsForEmail.length > 0 && signInMethodsForEmail.includes('password')) {
          auth = await this.afAuth.signInWithEmailAndPassword(email, password);
        } else {
          if (firebaseLogin === false) {
            auth = await this.afAuth.createUserWithEmailAndPassword(email, password);
          }
        }
        if (auth && auth.user != null) {
          this.setRoleAndToken(email);
          FbAuthSingleton.getInstance().setFbAuth(auth);
          resolve({isAuth: true, message: 'Authentification réussie'});
        }
      } catch (error) {
        console.log('Error', error);
        reject({isAuth: false, message: error.message});
      }
    });
  }

  public async loginAnonymous(): Promise<{ id: string; isAuth: boolean; message: string; token: string; expirationTime: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const auth = await this.afAuth.signInAnonymously();
        if (auth.user != null) {
          this.setRoleAndToken();
          const token = await auth.user.getIdTokenResult();
          FbAuthSingleton.getInstance().setFbAuth(auth);
          this.settingsService.user.next({
            ...this.settingsService.user.value,
            role: Role.GUEST,
            connectionTime: Date.now(),
          });
          resolve({
            id: auth.user.uid,
            isAuth: true,
            message: 'Authentification réussie',
            token: token.token,
            expirationTime: token.expirationTime,
          });
        }
      } catch (error) {
        reject({id: '', isAuth: false, message: error.message});
      }
    });
  }

  public logout(): Promise<{ isAuth: boolean; message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        if (this.settingsService.user.value.role === Role.GUEST) {
          await (await this.afAuth.currentUser).delete();
        }
        await this.afAuth.signOut();
        this.settingsService.reset();
        resolve({isAuth: false, message: 'Déconnexion réussie'});
      } catch (error) {
        reject({isAuth: true, message: error.message});
      }
    });
  }

  public getRole(email: string): Role {
    if (email) {
      return Role.ADVISOR;
    }
    return Role.GUEST;
  }

  private setRoleAndToken(email?: string) {
    this.afAuth.authState.subscribe(async (state) => {
      if (state !== null) {
        this.settingsService.user.next({...this.settingsService.user.value, role: this.getRole(email), email});
      }
    });
  }
}
