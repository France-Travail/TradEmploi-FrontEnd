import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from 'src/environments/authflow';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['../../../sass/panel.scss'],
})
export class AuthenticationComponent {
  constructor(private oauthService: OAuthService) {
    this.configureSSO();
  }
  configureSSO() {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.oidc = true;
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    
  }

  login() {
    this.oauthService.initCodeFlow();
    
  }
}
