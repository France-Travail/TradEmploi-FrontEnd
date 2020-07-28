import { User } from 'firebase';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { SettingsService } from 'src/app/services/settings.service';
import { ChatService } from 'src/app/services/chat.service';
import { Role } from 'src/app/models/role';

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
    private formBuilder: FormBuilder, 
    private toastService: ToastService,
    private chatService: ChatService,
    private settingsService: SettingsService) {
    this.settingsService.user.subscribe((user) => {
      if (user !== null) {
        this.router.navigateByUrl('choice');
      }
    });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
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
        const key = this.chatService.addMember(this.roomId, this.username.value)
        this.settingsService.user.next({... this.settingsService.user.value, id: key, firstname: this.username.value, roomId: this.roomId, role: Role.GUEST })
        this.toastService.showToast(auth.message, 'toast-success');
        this.router.navigateByUrl('choice');
    } catch (error) {
        this.toastService.showToast(error.message, 'toast-error');
    }
  }
}