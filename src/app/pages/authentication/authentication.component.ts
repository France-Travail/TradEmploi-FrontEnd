import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { ERROR_FUNC_LOGIN_OR_PASSWORD } from 'src/app/models/error/errorFunctionnal';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { SettingsService } from 'src/app/services/settings.service';
import { ToastService } from 'src/app/services/toast.service';
import { authCodeFlowConfig } from '../../../environments/authflow';
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['../../../sass/panel.scss'],
})
export class AuthenticationComponent implements OnInit {
  public form: FormGroup;
  public isOauthLogin: boolean = authCodeFlowConfig.loginUrl != undefined;
  public oAuthProvider:string = authCodeFlowConfig.issuer;
  constructor(
    private readonly oauthService: OAuthService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private chatService: ChatService,
    private toastService: ToastService,
    private settingsService: SettingsService
  ) {
    this.configureSSO();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.required]],
    });
    console.log(this.isOauthLogin);
  }

  get email(): AbstractControl {
    return this.form.get('email');
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }

  public async onSubmit(): Promise<void> {
    try {
      const auth = await this.authService.login(this.email.value, this.password.value, true);
      if (auth.isAuth) {
        const roomId = this.chatService.createRoomId();
        localStorage.setItem('isLogged', 'true');
        this.settingsService.user.next({
          ...this.settingsService.user.value,
          role: this.authService.getRole(this.email.value),
          firstname: 'Conseiller',
          lastname: 'Pôle Emploi',
          email: this.email.value,
          connectionTime: Date.now(),
          roomId,
          isMultiDevices: false,
        });
        localStorage.setItem('user', JSON.stringify(this.settingsService.user.value));
        this.router.navigateByUrl('choice');
      }
    } catch (error) {
      this.toastService.showToast(ERROR_FUNC_LOGIN_OR_PASSWORD.description, 'toast-error');
    }
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
