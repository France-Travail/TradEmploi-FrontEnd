import { SettingsService } from 'src/app/services/settings.service';
import { Role } from './../models/role';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastService } from 'src/app/services/toast.service';
import { ERROR_TECH_DB } from '../models/error/errorTechnical';
import { FbAuthSingleton } from '../models/token/FbAuthSingleton';
import { TokenFbService } from './token-fb.service';
import { TokenBrokerService } from './token-broker.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private toastService: ToastService,
    private settingsService: SettingsService,
    private tbFbs: TokenFbService,
    private tbs: TokenBrokerService
  ) {}

  public login(email: string, password: string): Promise<{ isAuth: boolean; message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const auth = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
        if (auth.user != null) {
          this.setRole();
          FbAuthSingleton.getInstance().setFbAuth(auth);
          this.tbFbs.jwtFbOnSingleton();
          this.tbs.getTokenGcp();
          resolve({ isAuth: true, message: 'Authentification réussie' });
        }
      } catch (error) {
        reject({ isAuth: false, message: error.message });
      }
    });
  }

  public async loginAnonymous(roomId: string): Promise<{ id: string; isAuth: boolean; message: string; token: string; expirationTime: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const auth = await this.afAuth.auth.signInAnonymously();
        if (auth.user != null) {
          this.setRole();
          const token = await auth.user.getIdTokenResult();
          FbAuthSingleton.getInstance().setFbAuth(auth);
          this.tbFbs.jwtFbOnSingleton();
          this.tbs.getTokenGcp();
          this.settingsService.user.next({ ...this.settingsService.user.value, role: Role.GUEST, connectionTime: Date.now() });
          resolve({ id: auth.user.uid, isAuth: true, message: 'Authentification réussie', token: token.token, expirationTime: token.expirationTime });
        }
      } catch (error) {
        reject({ id: '', isAuth: false, message: error.message });
      }
    });
  }

  public logout(): Promise<{ isAuth: boolean; message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        if (this.settingsService.user.value.role === Role.GUEST) {
          await this.afAuth.auth.currentUser.delete();
        }
        await this.afAuth.auth.signOut();
        this.settingsService.reset();
        resolve({ isAuth: false, message: 'Déconnexion réussie' });
      } catch (error) {
        reject({ isAuth: true, message: error.message });
      }
    });
  }

  private getRole(config: any, email: string): Role {
    if (email !== null) {
      if (config[0].adminList.includes(email)) {
        return Role.ADMIN;
      }
      if (config[0].advisors.includes(email)) {
        return Role.ADVISOR;
      }
    }
    return Role.GUEST;
  }

  private setRole() {
    this.afAuth.authState.subscribe(async (state) => {
      if (state !== null) {
        this.db
          .collection('config')
          .valueChanges()
          .subscribe((config: any) => {
            if (config !== undefined && config.length >= 0) {
              this.settingsService.user.next({ ...this.settingsService.user.value, role: this.getRole(config, state.email) });
            } else {
              this.toastService.showToast(ERROR_TECH_DB.description, 'toast-error');
            }
          });
      }
    });
  }
}
