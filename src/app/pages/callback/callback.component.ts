import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ERROR_FUNC_LOGIN_OR_PASSWORD } from 'src/app/models/error/errorFunctionnal';
import { ERROR_TECH_DB } from 'src/app/models/error/errorTechnical';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { SettingsService } from 'src/app/services/settings.service';
import { ToastService } from 'src/app/services/toast.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss'],
})
export class CallbackComponent implements OnInit {
  constructor(private authService: AuthService, private settingsService: SettingsService, private router: Router, private toastService: ToastService, private chatService: ChatService) {}

  ngOnInit(): void {
    console.log(window.location.href);
    const token = this.getToken(window.location.href);
    try {
      const payload: any = this.getPayload(token);
      console.log(payload);
      if (payload.email.match('.*@pole-emploi[.]fr$')) {
        this.loginAuthentifacted(payload.email);
      }
    } catch (error) {
      this.router.navigateByUrl('/start');
    }
  }
  private getToken(url: string) {
    return url.split('&')[1].split('=')[1];
  }
  private getPayload(token: string) {
    return jwtDecode(token);
  }
  private async loginAuthentifacted(email?: string) {
    try {
      const auth = await this.authService.login('admin@pe.fr', 'trademploi2021');
      const roomId = this.chatService.getRoomId();
      localStorage.setItem('isLogged', 'true');
      this.authService.role.subscribe((role) => {
        this.settingsService.user.next({
          ...this.settingsService.user.value,
          role,
          firstname: 'Pôle emploi',
          connectionTime: Date.now(),
          roomId,
          isMultiDevices: false,
        });
        localStorage.setItem('user', JSON.stringify(this.settingsService.user.value));
        this.router.navigateByUrl('modality');
      });
    } catch (error) {
      if (error.message.includes('password') || error.message.includes('identifier')) {
        this.toastService.showToast(ERROR_FUNC_LOGIN_OR_PASSWORD.description, 'toast-error');
      } else {
        this.toastService.showToast(ERROR_TECH_DB.description, 'toast-error');
      }
    }
  }
}
