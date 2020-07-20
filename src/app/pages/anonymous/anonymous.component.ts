import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-anonymous',
  templateUrl: './anonymous.component.html',
  styleUrls: ['./anonymous.component.scss'],
})
export class AnonymousComponent{
  public form: FormGroup;
  private roomId: string;

  constructor(private authService: AuthService, 
    private router: Router, 
    private fb: FormBuilder, 
    private toastService: ToastService,
    private settingsService : SettingsService) {
    this.authService.auth.subscribe((user) => {
      if (user !== null) {
        this.router.navigateByUrl('choice');
      }
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.minLength(6), Validators.required]],
    });
    const url = this.router.url;
    this.roomId = url.substring(url.lastIndexOf('/')+1, url.length);
  }

  get username(): AbstractControl {
    return this.form.get('username');
  }

  public async onSubmit(): Promise<void> {
    try {
      const auth = await this.authService.loginAnonymous();
      const key = "key"
      this.settingsService.guest.next({ ...this.settingsService.guest.value, firstname: this.username.value, roomId: this.roomId , id: key});
      this.toastService.showToast(auth.message, 'toast-success');
      this.router.navigateByUrl('choice');
    } catch (error) {
      this.toastService.showToast(error.message, 'toast-error');
    }
  }
}