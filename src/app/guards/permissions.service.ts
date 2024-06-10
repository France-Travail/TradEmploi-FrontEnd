import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { ChatService } from '../services/chat.service';
import { SettingsService } from '../services/settings.service';
import { inject } from '@angular/core';

type CanActivateType = Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(private readonly settingsService: SettingsService, private readonly chatService: ChatService, private readonly router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): CanActivateType {
    return new Promise((resolve) => {
      if ((!localStorage.getItem('user') || localStorage.getItem('user') == null) && (!sessionStorage.getItem('user') || sessionStorage.getItem('user') == null)) {
        this.settingsService.user.next(null);
        this.navigateToStartWithAuth(state.url);
      } else {
        if (!this.settingsService.user.value) {
          if (localStorage.getItem('user') !== null) {
            this.whenUserItemInLocalStorageIsNull(state.url);
          } else { this.whenUserItemInLocalStorageIsNotNull(state.url); }
        } else { this.whenRoomIdIsUndefined(); }
        resolve(true);
      }
    });
  }

  private navigateToStartWithAuth(url: string) {
    // this.router.
    sessionStorage.setItem('redirectUrl', url);
    this.router.navigate(['/start']);
  }

  private whenUserItemInLocalStorageIsNull(url: string) {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const roomId = this.chatService.createRoomId();
      this.settingsService.user.next({
        ...this.settingsService.user.value,
        firstname: user.firstname,
        role: user.role,
        language: user.language,
        roomId,
        connectionTime: user.connectionTime
      });
    } catch (error) {
      this.navigateToStartWithAuth(url);
    }
  }

  private whenUserItemInLocalStorageIsNotNull(url: string) {
    if (sessionStorage.getItem('user') !== null) {
      const user = JSON.parse(sessionStorage.getItem('user'));
      try {
        this.settingsService.user.next({
          ...this.settingsService.user.value,
          firstname: user.firstname,
          role: user.role,
          language: user.language,
          roomId: user.roomId,
          connectionTime: user.connectionTime
        });
      } catch (error) {
        this.navigateToStartWithAuth(url);
      }
    } else {
      this.navigateToStartWithAuth(url);
    }
  }

  private whenRoomIdIsUndefined() {
    if (this.settingsService.user.value && this.settingsService.user.value.roomId === undefined) {
      if (localStorage.getItem('user') !== null) {
        const user = JSON.parse(localStorage.getItem('user'));
        const roomId = this.chatService.createRoomId();
        this.settingsService.user.next({
          ...this.settingsService.user.value,
          firstname: user.firstname,
          role: user.role,
          language: user.language,
          roomId,
          connectionTime: user.connectionTime
        });
      }
    }
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return <boolean>inject(PermissionsService).canActivate(next, state);
}
