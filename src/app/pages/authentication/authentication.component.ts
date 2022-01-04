import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
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
  }
  configureSSO() {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.oidc = true;
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
  }

  login() {
    this.oauthService.initCodeFlow();
  }
}
