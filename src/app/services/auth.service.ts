import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Auth } from '../models/auth';
import { ToastService } from 'src/app/services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public auth: BehaviorSubject<Auth> = new BehaviorSubject<Auth>(null);

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore,  private toastService: ToastService) {
    this.afAuth.authState.subscribe(async (state) => {
      if (state !== null) {
        this.auth.next({ user: state });
        this.db
          .collection('config')
          .valueChanges()
          .subscribe((config: any) => {
            if (config !== undefined && config.length >= 0) {
              this.auth.next({ user: state, role: this.getRole(config, state.email) });
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
        const user = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
        this.auth.next({ user: user.user });
        resolve({ isAuth: true, message: 'Authentification réussie' });
      } catch (error) {
        reject({ isAuth: false, message: error.message });
      }
    });
  }

  public loginAnonymous(): Promise<{ isAuth: boolean; message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.afAuth.auth.signInAnonymously()
        this.auth.next({ user: user.user });
        resolve({ isAuth: true, message: 'Authentification réussie' });
      } catch (error) {
        reject({ isAuth: false, message: error.message });
      }
    });
  }

  public logout(): Promise<{ isAuth: boolean; message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.afAuth.auth.signOut();
        this.auth.next(null);
        resolve({ isAuth: false, message: 'Déconnexion réussie' });
      } catch (error) {
        reject({ isAuth: true, message: error.message });
      }
    });
  }


  private getRole(config:any, email:String): 'USER' | 'ADMIN' | 'ADVISOR'{
    if (email != null) {
      if(config[0].adminList.includes(email)){
        // console.log('config[0] >>>> ', config[0])
        return 'ADMIN'
      }
      if(config[0].advisors.includes(email)){
        return 'ADVISOR'
      }
    }
    return 'USER'
  }
}
