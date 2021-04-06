import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ChatService } from '../services/chat.service';
import { SettingsService } from '../services/settings.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private settingsService: SettingsService, private chatService: ChatService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve) => {
      if ((!localStorage.getItem('user') || localStorage.getItem('user') == null) && (!sessionStorage.getItem('user') || sessionStorage.getItem('user') == null)) {
        this.settingsService.user.next(null);
        this.router.navigate(['/start']);
      } else {
        if (!this.settingsService.user.value || this.settingsService.user.value == null) {
          if (localStorage.getItem('user') != null) {
            const user = JSON.parse(localStorage.getItem('user'));
            try {
              const roomId = this.chatService.getRoomId();
              this.settingsService.user.next({ ...this.settingsService.user.value, firstname: user.firstname, role: user.role, language: user.language, roomId, connectionTime: user.connectionTime });
            } catch (error) {
              this.router.navigate(['/start']);
            }
          } else if (sessionStorage.getItem('user') != null) {
            const user = JSON.parse(sessionStorage.getItem('user'));
            try {
              this.settingsService.user.next({
                ...this.settingsService.user.value,
                firstname: user.firstname,
                role: user.role,
                language: user.language,
                roomId: user.roomId,
                connectionTime: user.connectionTime,
              });
            } catch (error) {
              this.router.navigate(['/start']);
            }
          } else {
            this.router.navigate(['/start']);
          }
        } else if (this.settingsService.user.value && this.settingsService.user.value.roomId === undefined) {
          if (localStorage.getItem('user') !== null) {
            const user = JSON.parse(localStorage.getItem('user'));
            const roomId = this.chatService.getRoomId();
            this.settingsService.user.next({ ...this.settingsService.user.value, firstname: user.firstname, role: user.role, language: user.language, roomId, connectionTime: user.connectionTime });
          }
        }
        resolve(true);
      }
    });
  }
}
