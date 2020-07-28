import { SettingsService } from 'src/app/services/settings.service';
import { Role } from './../models/role';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastService } from 'src/app/services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore,  private toastService: ToastService, private settingsService: SettingsService) {
    this.afAuth.authState.subscribe(async (state) => {
      if (state !== null) {
        this.db
          .collection('config')
          .valueChanges()
          .subscribe((config: any) => {
            if (config !== undefined && config.length >= 0) {
              this.settingsService.user.next({... this.settingsService.user.value, role: this.getRole(config, state.email) })
            }else{
              this.toastService.showToast('La base de donnée est indisponible momentanément. Merci de réessayer plus tard.', 'toast-error');
            }
          });
      }
    });
  }

  public login(email: string, password: string): Promise<{ isAuth: boolean; message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const auth = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
        if(auth.user != null){
          resolve({ isAuth: true, message: 'Authentification réussie' });
        }
      } catch (error) {
        reject({ isAuth: false, message: error.message });
      }
    });
  }

  public loginAnonymous(): Promise<{ isAuth: boolean; message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const auth = await this.afAuth.auth.signInAnonymously()
        if(auth.user != null){
          resolve({ isAuth: true, message: 'Authentification réussie' });
        }
      } catch (error) {
        reject({ isAuth: false, message: error.message });
      }
    });
  }

  public logout(): Promise<{ isAuth: boolean; message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.afAuth.auth.signOut();
        this.settingsService.reset()
        resolve({ isAuth: false, message: 'Déconnexion réussie' });
      } catch (error) {
        reject({ isAuth: true, message: error.message });
      }
    });
  }


  private getRole(config:any, email:String): Role{
    if(config[0].adminList.includes(email)){
      return Role.ADMIN
    }
    if(config[0].advisors.includes(email)){
      return Role.ADVISOR
    }
    return Role.GUEST
  }
}
