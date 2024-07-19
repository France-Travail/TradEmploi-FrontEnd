import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {params} from '../../../environments/params';
import {ERROR_FUNC_LOGIN_OR_PASSWORD, ERROR_FUNC_OAUTH} from '../../models/error/errorFunctionnal';
import {AuthService} from '../../services/auth.service';
import {ChatService} from '../../services/chat.service';
import {ToastService} from '../../services/toast.service';
import {SettingsService} from '../../services/settings.service';
import {FbAuthSingleton} from '../../models/token/FbAuthSingleton';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { AuthType } from '../../models/AuthType';
import { extractDomain } from '../../utils/utils'

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss', '../../../sass/panel.scss'],
})
export class AuthenticationComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly fb: UntypedFormBuilder,
    private readonly authService: AuthService,
    private readonly chatService: ChatService,
    private readonly toastService: ToastService,
    private readonly settingsService: SettingsService,
    private readonly cd: ChangeDetectorRef,
    private readonly zone: NgZone,
    private readonly globalService: GlobalService
  ) { }

  get email(): AbstractControl {
    return this.form.get('email');
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }

  public form: UntypedFormGroup;
  public isOauthLogin: boolean = Boolean(params.oauthIdProvider);
  public showOauthLoginError: boolean ;
  public oauthIdProvider: string = params.oauthIdProvider;
  public authPending = false;
  private disconnected = false;

  protected readonly params = params;

  ngOnInit(): void {
    this.route.queryParams.forEach((params: Params) => {
      this.disconnected = params['disconnected'];
    });
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.required]],
    });
  }

  public async onSubmit(): Promise<void> {
    if (!this.isOauthLogin || params.authType === AuthType.both || params.authType === AuthType.loginPassword) {
      try {
        const auth = await this.authService.login(this.email.value, this.password.value, true);
        if (auth.isAuth) {
          const roomId = this.chatService.createRoomId();
          localStorage.setItem('isLogged', 'true');
          this.settingsService.user.next({
            ...this.settingsService.user.value,
            role: this.authService.getRole(this.email.value),
            firstname: params.organization.organizationUser,
            lastname: params.organization.name,
            email: this.email.value,
            connectionTime: Date.now(),
            roomId,
            isMultiDevices: false,
          });
          this.globalService.currentUserDomain = extractDomain(this.email.value);
          localStorage.setItem('user', JSON.stringify(this.settingsService.user.value));
          this.redirectPostAuth();
        }
      } catch (error) {
        this.toastService.showToast(ERROR_FUNC_LOGIN_OR_PASSWORD.description, 'toast-error');
      }
    }
  }

  oauthLogin() {
    this.authPending = true;
    this.showOauthLoginError = false;
    firebase.auth().getRedirectResult()
      .then(value => {
        if (value?.user !== undefined && value?.user !== null) {
          try {
            const roomId = this.chatService.createRoomId();
            localStorage.setItem('isLogged', 'true');
            const userEmail = value.additionalUserInfo.profile["Mail"];
            this.settingsService.user.next({
              ...this.settingsService.user.value,
              role: this.authService.getRole(userEmail),
              firstname: params.organization.organizationUser,
              lastname: params.organization.name,
              email: userEmail,
              connectionTime: Date.now(),
              roomId,
              isMultiDevices: false,
            });
            FbAuthSingleton.getInstance().setFbAuth(value);
            localStorage.setItem('user', JSON.stringify(this.settingsService.user.value));
            this.redirectPostAuth();
          } catch (error) {
            this.oauthLoginHandleError();
          }
        } else {
          this.authPending = false;
          if (params.authType == AuthType.SSO && !this.disconnected) {
            const provider = new firebase.auth.OAuthProvider(this.oauthIdProvider);
            firebase.auth().signInWithRedirect(provider);
          }
        }
      }, reason => this.oauthLoginHandleError());
  }

  oauthLoginHandleError(): void {
    this.authPending = false;
    this.showOauthLoginError = true;
    this.cd.detectChanges();
    this.toastService.showToast(ERROR_FUNC_OAUTH.description, 'toast-error');
  }

  private redirectPostAuth() {
    this.zone.run(() => {
      // On récupère l'url demandée avant le process d'authentification
      const redirectUrl: string = sessionStorage.getItem('redirectUrl');
      sessionStorage.removeItem('redirectUrl');

      // Si l'url est alimentée que ce n'est pas les pages de chargement alors on redirige
      // sinon on va à la page de choix de la langue
      if (redirectUrl !== undefined && redirectUrl !== null && !redirectUrl.includes('start') && !redirectUrl.includes('auth')) {
        this.router.navigateByUrl(redirectUrl);
      } else {
        this.router.navigateByUrl('choice');
      }
    });
  }

  public connexionTraduction() {
    this.authPending = true;
    const provider = new firebase.auth.OAuthProvider(this.oauthIdProvider);
    firebase.auth().signInWithRedirect(provider);
  }

  protected readonly AuthType = AuthType;
}
