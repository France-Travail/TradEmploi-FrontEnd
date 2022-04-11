import { Role } from './../models/role';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FbAuthSingleton } from '../models/token/FbAuthSingleton';
import axios from 'axios';
import { authCodeFlowConfig } from '../../environments/authflow';
import { SettingsService } from './settings.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly afAuth: AngularFireAuth, private readonly settingsService: SettingsService) {
  }

  public login( emailPe: string, password: string, ): Promise<{ isAuth: boolean; message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const auth = await this.afAuth.auth.signInWithEmailAndPassword(emailPe, password);
        if (auth.user != null) {
          this.setRoleAndToken(emailPe);
          FbAuthSingleton.getInstance().setFbAuth(auth);
          resolve({ isAuth: true, message: 'Authentification réussie' });
        }
      } catch (error) {
        if (error.code === 'auth/user-not-found') {
          const auth = await this.afAuth.auth.createUserWithEmailAndPassword(emailPe, password);
          FbAuthSingleton.getInstance().setFbAuth(auth);
          resolve({ isAuth: true, message: 'Authentification réussie' });
        } else {
          console.log('Error', error);
          reject({ isAuth: false, message: error.message });
        }
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
          this.settingsService.user.next({
            ...this.settingsService.user.value,
            role: Role.GUEST,
            connectionTime: Date.now()
          });
          resolve({
            id: auth.user.uid,
            isAuth: true,
            message: 'Authentification réussie',
            token: token.token,
            expirationTime: token.expirationTime
          });
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
    if (email && email.match('.*@pole-emploi[.]fr$')) {
      return Role.ADVISOR;
    }
    return Role.GUEST;
  }

  private setRoleAndToken(emailPe?: string) {
    this.afAuth.authState.subscribe(async (state) => {
      if (state !== null) {
        this.settingsService.user.next({ ...this.settingsService.user.value, role: this.getRole(emailPe) });
      }
    });
  }

  public getUserInfos(token: string) {
    return axios
      .post(authCodeFlowConfig.userinfoEndpoint, null, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then(response => response.status === 200 ? response.data : null)
      .catch(error => {
        console.log(error);
      });
  }


  private async revokePeam(accessToken) {
    axios
      .post(authCodeFlowConfig.revocationEndpoint, null, {
        params: {
          token: accessToken,
          client_id: authCodeFlowConfig.clientId,
          client_secret: authCodeFlowConfig.dummyClientSecret
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  private async getIdHint(accessToken) {
    return axios.post(environment.peama.accessTokenUri, null, {
      params: {
        token: accessToken,
        client_id: authCodeFlowConfig.clientId,
        client_secret: authCodeFlowConfig.dummyClientSecret,
        redirect_uri: authCodeFlowConfig.redirectUri,
        grant_type: 'client_credentials',
        code: accessToken,
        scope: authCodeFlowConfig.scope
      }
    }).then((response) => {
      return response.data.id_token;
    });
  }

  private async closeSession(idHint) {
    return axios.get(environment.peama.closeSessionUri, {
      params: {
        id_token_hint: idHint
      }
    });
  }


  public async closePeam(accessToken) {
    const idHint = await this.getIdHint(accessToken);
    this.revokePeam(accessToken);
    this.closeSession(idHint);
  }
}
