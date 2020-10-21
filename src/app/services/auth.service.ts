import { SettingsService } from 'src/app/services/settings.service';
import { Role } from './../models/role';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastService } from 'src/app/services/toast.service';
import { ErrorCodes } from '../models/errorCodes';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private toastService: ToastService, private settingsService: SettingsService) {}

  public login(email: string, password: string): Promise<{ isAuth: boolean; message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const auth = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
        if (auth.user != null) {
          this.setRole();
          resolve({ isAuth: true, message: 'Authentification réussie' });
        }
      } catch (error) {
        reject({ isAuth: false, message: error.message });
      }
    });
  }

  public async loginAnonymous(): Promise<{ id: string; isAuth: boolean; message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const auth = await this.afAuth.auth.signInAnonymously();
        if (auth.user != null) {
          this.setRole();
          const id = auth.user.uid;
          this.settingsService.user.next({ ...this.settingsService.user.value, id, role: Role.GUEST, connectionTime : Date.now() });
          resolve({ id, isAuth: true, message: 'Authentification réussie' });
        }
      } catch (error) {
        reject({ isAuth: false, message: error.message });
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
              const error = ErrorCodes.DBERROR;
              this.toastService.showToast(error, 'toast-error');
            }
          });
      }
    });
  }
}
