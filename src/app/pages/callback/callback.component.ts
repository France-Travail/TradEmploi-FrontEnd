import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TelemetryService } from '../../services/telemetry.service';
import { AuthService } from '../../services/auth.service';
import { SettingsService } from '../../services/settings.service';
import { ChatService } from '../../services/chat.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
})
export class CallbackComponent implements OnInit {
  private user;
  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly settingsService: SettingsService,
    private readonly router: Router,
    private readonly chatService: ChatService,
    private readonly telemetryService: TelemetryService
  ) {}

  async ngOnInit(): Promise<void> {
    const nonce = sessionStorage.getItem("nonce")
    this.activatedRoute.queryParams.subscribe((params) => {
      this.user = {
        given_name: params.name,
        family_name: params.family_name,
        email: params.email,
        sub: params.sub,
        state:params.state
      };
    });

    try {
      if (this.user.email.match('.*@pole-emploi[.]fr$') && this.user.state === nonce) {
        this.loginAuthentificated(this.user.email, this.user.given_name, this.user.family_name, this.user.sub);
      }else{
        this.router.navigateByUrl('/start')
      }
    } catch (error) {
      this.router.navigateByUrl('/start');
    }
  }
  
  private async loginAuthentificated(email: string, firstname: string, lastname: string, idDGASI: string) {
    try {
      await this.authService.login(email, environment.peama.password);
      await this.telemetryService.logPeama(idDGASI);
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
        isMultiDevices: false,
      });
      localStorage.setItem('user', JSON.stringify(this.settingsService.user.value));
      this.router.navigateByUrl('choice');
    } catch (error) {}
  }
}