import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TelemetryService } from '../../services/telemetry.service';
import { AuthService } from '../../services/auth.service';
import { SettingsService } from '../../services/settings.service';
import { ChatService } from '../../services/chat.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html'
})
export class CallbackComponent implements OnInit {
  constructor(private readonly authService: AuthService,
              private readonly settingsService: SettingsService,
              private readonly router: Router,
              private readonly chatService: ChatService,
              private readonly telemetryService: TelemetryService) {
  }

  async ngOnInit(): Promise<void> {
    const accessToken = this.getAccessToken(window.location.href);
    const user = await this.authService.getUserInfos(accessToken);
    try {
      if (user.email.match('.*@pole-emploi[.]fr$')) {
        this.loginAuthentificated(user.email, user.given_name, user.family_name, user.sub);
        sessionStorage.setItem('access', accessToken);
      }
    } catch (error) {
      this.router.navigateByUrl('/start');
    }
  }

  public getAccessToken(url: string) {
    const separator = 'access_token';
    const separatorEqual = '=';
    const separatorAnd = '&';
    if (url && url.includes(separator) && url.includes(separatorEqual) && url.includes(separatorAnd)) {
      return url.split(separator)[1].split(separatorEqual)[1].split(separatorAnd)[0];
    }
    return null;
  }

  private async loginAuthentificated(email: string, firstname: string, lastname: string, idDGASI: string) {
    try {
      await this.authService.login(environment.peama.login, environment.peama.password, email);
      this.telemetryService.logPeama(idDGASI);
      const roomId = this.chatService.getRoomId();
      localStorage.setItem('isLogged', 'true');
      this.settingsService.user.next({
        ...this.settingsService.user.value,
        role: this.authService.getRole(email),
        firstname,
        lastname,
        email,
        idDGASI,
        agency: '',
        connectionTime: Date.now(),
        roomId,
        isMultiDevices: false
      });
      localStorage.setItem('user', JSON.stringify(this.settingsService.user.value));
      this.router.navigateByUrl('choice');
    } catch (error) {
    }
  }
}
