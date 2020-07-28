import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { SettingsService } from 'src/app/services/settings.service';
import { ChatService } from 'src/app/services/chat.service';

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
    private ts: ToastService,
    private ss : SettingsService,
    private cs: ChatService) {
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
        const key = this.cs.addMember(this.roomId, this.username.value)
        this.ss.guest.next({ ...this.ss.guest.value, firstname: this.username.value, roomId: this.roomId , id: key});
        this.ts.showToast(auth.message, 'toast-success');
        this.router.navigateByUrl('choice');
    } catch (error) {
        this.ts.showToast(error.message, 'toast-error');
    }
  }
}
