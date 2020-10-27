import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { SettingsService } from 'src/app/services/settings.service';
import { ChatService } from 'src/app/services/chat.service';
import { Role } from 'src/app/models/role';

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
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
    private chatService: ChatService
  ) {
    this.settingsService.user.subscribe((user) => {
      if (user !== null) {
        const isFromAuth: boolean = window.location.pathname === '/auth';
        if (isFromAuth) {
          this.router.navigateByUrl('choice');
        }
      } else if (localStorage.getItem('user') != null) {
        const USER = JSON.parse(localStorage.getItem('user'));
        this.settingsService.user.next({
          ...this.settingsService.user.value,
          firstname: USER.firstname,
          role: USER.role,
          roomId: USER.roomId,
          language: USER.language,
          connectionTime: USER.connectionTime,
        });
        this.router.navigateByUrl('choice');
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
      const role = this.form.get('email').value === 'admin@pe.fr' ? Role.ADMIN : Role.ADVISOR;
      this.toastService.showToast(auth.message, 'toast-success');
      const roomId: string = (10000000 + Math.floor(Math.random() * 10000000)).toString();
      this.settingsService.user.next({ ...this.settingsService.user.value, roomId: roomId, hasShared: false, role: role, firstname: 'Pôle emploi', connectionTime: Date.now() });
      localStorage.setItem('user', JSON.stringify(this.settingsService.user.value));
      this.chatService.create(roomId);
      this.router.navigateByUrl('choice');
    } catch (error) {
      this.toastService.showToast(error.message, 'toast-error');
    }
  }
}
