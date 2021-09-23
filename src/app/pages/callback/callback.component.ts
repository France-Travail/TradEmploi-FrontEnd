import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth.service';
import {ChatService} from 'src/app/services/chat.service';
import {SettingsService} from 'src/app/services/settings.service';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss'],
})
export class CallbackComponent implements OnInit {
  constructor(private authService: AuthService, private settingsService: SettingsService, private router: Router, private chatService: ChatService, ) {
  }

  async ngOnInit(): Promise<void> {
    const accessToken = this.getAccessToken(window.location.href);
    const user = await this.authService.getUserInfos(accessToken)
    try {
      if (user.email.match('.*@pole-emploi[.]fr$')) {
        this.loginAuthentificated(user.email);
        localStorage.setItem('emailPe', user.email);
      }
    } catch (error) {
      this.router.navigateByUrl('/start');
    }
  }

  private getAccessToken(url: string) {
    return url.split('access_token')[1].split('=')[1].split('&')[0]
  }

  private async loginAuthentificated(emailPe: string) {
    try {
      const auth = await this.authService.login(environment.peama.login, environment.peama.password, emailPe);
      const roomId = this.chatService.getRoomId();
      localStorage.setItem('isLogged', 'true');
      this.settingsService.user.next({
        ...this.settingsService.user.value,
        role: this.authService.getRole(emailPe),
        firstname: 'Pôle emploi',
        connectionTime: Date.now(),
        roomId,
        isMultiDevices: false,
      });
      localStorage.setItem('user', JSON.stringify(this.settingsService.user.value));
      this.router.navigateByUrl('modality');

    } catch (error) {
    }
  }
}
