import { Component } from '@angular/core';
import { OAuthEvent, OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { authCodeFlowConfig } from '../../../environments/authflow';
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['../../../sass/panel.scss'],
})
export class AuthenticationComponent {
  constructor(private readonly oauthService: OAuthService) {
    this.configureSSO();
    this.oauthService.events.subscribe(({ type }: OAuthEvent) => {
      console.log(type)
    });
  }
  
  configureSSO() {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.oidc = true;
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
  }

  login() {
    this.oauthService.initLoginFlow();
  }
}
