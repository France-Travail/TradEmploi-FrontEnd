import { SettingsService } from 'src/app/services/settings.service';
import { Role } from './../models/role';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FbAuthSingleton } from '../models/token/FbAuthSingleton';
import { TokenBrokerService } from './token-broker.service';
import axios from 'axios';
import { authCodeFlowConfig } from '../../environments/authflow';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private settingsService: SettingsService, private tbs: TokenBrokerService) {}

  public login(email: string, password: string, emailPe: string): Promise<{ isAuth: boolean; message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const auth = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
        if (auth.user != null) {
          this.setRoleAndToken(emailPe);
          FbAuthSingleton.getInstance().setFbAuth(auth);
          resolve({ isAuth: true, message: 'Authentification réussie' });
        }
      } catch (error) {
        reject({ isAuth: false, message: error.message });
      }
    });
  }

  public async loginAnonymous(): Promise<{ id: string; isAuth: boolean; message: string; token: string; expirationTime: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const auth = await this.afAuth.auth.signInAnonymously();
        if (auth.user != null) {
          this.setRoleAndToken();
          const token = await auth.user.getIdTokenResult();
          FbAuthSingleton.getInstance().setFbAuth(auth);
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

  public getRole(email: string): Role {
    if (email !== null) {
      if (email.match('.*@pole-emploi[.]fr$')) {
        return Role.ADVISOR;
      }
    }
    return Role.GUEST;
  }

  private setRoleAndToken(emailPe?: string) {
    this.afAuth.authState.subscribe(async (state) => {
      if (state !== null) {
        this.settingsService.user.next({ ...this.settingsService.user.value, role: this.getRole(emailPe) });
        this.tbs.getTokenGcp();
      }
    });
  }

  public getUserInfos(token: string) {
    return axios
      .post(authCodeFlowConfig.userinfoEndpoint, null, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then(function (response) {
        return response.status === 200 ? response.data : null;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
