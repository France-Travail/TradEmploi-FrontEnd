import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Auth } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public auth: BehaviorSubject<Auth> = new BehaviorSubject<Auth>(null);

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
    this.afAuth.authState.subscribe(async state => {
      if (state !== null) {
        this.auth.next({ user: state });
        this.db.collection('config').valueChanges().subscribe((config: any) => {
          this.auth.next({ user: state, role: config[0].adminList.includes(state.email) ? 'ADMIN' : 'USER' });
        });
      }
    });
  }

  public login(email: string, password: string): Promise<{ isAuth: boolean; message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
        this.auth.next({ user: user.user });
        resolve({ isAuth: true, message: 'Authentification réussie'});
      } catch (error) {
        reject({ isAuth: false, message: error.message});
      }
    });
  }

  public logout(): Promise<{ isAuth: boolean; message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.afAuth.auth.signOut();
        this.auth.next(null);
        resolve({ isAuth: false, message: 'Déconnexion réussie'});
      } catch (error) {
        reject({ isAuth: true, message: error.message});
      }
    });
  }
}
