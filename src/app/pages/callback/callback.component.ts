import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TelemetryService} from '../../services/telemetry.service';
import {AuthService} from '../../services/auth.service';
import {SettingsService} from '../../services/settings.service';
import {ChatService} from '../../services/chat.service';
import axios, { AxiosRequestConfig } from 'axios';
import {params} from '../../../environments/params';
import { authCodeFlowConfig } from '../../../environments/authflow';
import { AuthConfig } from 'angular-oauth2-oidc';
import { GlobalService } from '../../services/global.service';
import { extractDomain } from '../../utils/utils'


@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
})
export class CallbackComponent implements OnInit {
  private user: any;
  private authCodeFlowConfig: AuthConfig;
  private config: AxiosRequestConfig<any>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly settingsService: SettingsService,
    private readonly router: Router,
    private readonly chatService: ChatService,
    private readonly telemetryService: TelemetryService,
    private readonly globalService: GlobalService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    const nonce = sessionStorage.getItem('nonce');

    this.activatedRoute.queryParams.subscribe(async (parameters) => {
     this.authCodeFlowConfig = authCodeFlowConfig;
     if (parameters.state === nonce) {
        const userinfo = await this.getUserInfo(parameters.access_token);
        this.user = {
          given_name: parameters.provider === 'PE' ? userinfo.name : userinfo.given_name,
          family_name: userinfo.family_name,
          email: userinfo.email,
          sub: userinfo.sub,
          state: userinfo.state,
        };
        this.globalService.currentUserDomain = extractDomain(this.user.email);
        try {
          await this.loginAuthenticated(this.user.email, this.user.given_name, this.user.family_name, this.user.sub);
        } catch (error) {
          await this.router.navigateByUrl('/start');
        }
      } else {
        await this.router.navigateByUrl('/start');
      }
    });
  }

  private readonly getUserInfo = async (accesstoken: string) => {

      return axios
        .get(this.authCodeFlowConfig.userinfoEndpoint + accesstoken, this.config)
        .then((response) => {
          return response.data;
        })
        .catch(error => {
          console.error(error);
        });
  }

  private async loginAuthenticated(email: string, firstname: string, lastname: string, idDGASI: string) {
    try {
      await this.authService.login(email, params.defaultPassword, false);
      await this.telemetryService.logUser(idDGASI + email.substring(email.indexOf('@')));
      const roomId = this.chatService.createRoomId();
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
    } catch (error) {
      console.log(error);
    }
  }
}
