import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['../../../sass/panel.scss'],
})
export class AuthenticationComponent implements OnInit {
  public form: FormGroup;

  constructor(private authService: AuthService, private settingsService: SettingsService, private router: Router, private fb: FormBuilder, private toastService: ToastService) {
    this.settingsService.user.subscribe((user) => {
      if (user !== null) {
        const isFromAuth: boolean = window.location.pathname === '/auth';
        if (isFromAuth) {
          this.router.navigateByUrl('choice');
        }
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
      this.toastService.showToast(auth.message, 'toast-success');
      this.router.navigateByUrl('choice');
    } catch (error) {
      this.toastService.showToast(error.message, 'toast-error');
    }
  }
}
