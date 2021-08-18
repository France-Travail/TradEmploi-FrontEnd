import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from 'src/app/services/auth.service';
import {ToastService} from 'src/app/services/toast.service';
import {SettingsService} from 'src/app/services/settings.service';
import {ChatService} from 'src/app/services/chat.service';
import {ERROR_TECH_DB} from 'src/app/models/error/errorTechnical';
import {ERROR_FUNC_LOGIN_OR_PASSWORD} from 'src/app/models/error/errorFunctionnal';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['../../../sass/panel.scss'],
})
export class AuthenticationComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private authService: AuthService,
    private settingsService: SettingsService,
    private chatService: ChatService,
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService
  ) {
    this.settingsService.user.subscribe((user) => {
      if (user !== null) {
        const isFromAuth: boolean = window.location.pathname === '/auth';
        if (isFromAuth) {
          this.router.navigateByUrl('modality');
        }
      } else if (localStorage.getItem('user') != null) {
        const USER = JSON.parse(localStorage.getItem('user'));
        this.settingsService.user.next({
          ...this.settingsService.user.value,
          firstname: USER.firstname,
          role: USER.role,
          language: USER.language,
          connectionTime: USER.connectionTime,
          isMultiDevices: USER.isMultiDevices,
        });
        this.router.navigateByUrl('modality');
      }
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.required]],
    });
  }

  get email(): AbstractControl {
    return this.form.get('email');
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }

  public async onSubmit(): Promise<void> {
    try {
      const auth = await this.authService.login(this.email.value, this.password.value);
      const roomId = this.chatService.getRoomId();
      localStorage.setItem('isLogged', 'true');
      this.authService.role.subscribe(role => {
        this.settingsService.user.next({
          ...this.settingsService.user.value,
          role,
          firstname: 'Pôle emploi',
          connectionTime: Date.now(),
          roomId,
          isMultiDevices: false
        });
        localStorage.setItem('user', JSON.stringify(this.settingsService.user.value));
        this.toastService.showToast(auth.message, 'toast-success');
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
