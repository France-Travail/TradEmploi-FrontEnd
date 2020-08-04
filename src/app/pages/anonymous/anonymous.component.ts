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
    private formBuilder: FormBuilder, 
    private toastService: ToastService,
    private settingsService : SettingsService,
    private chatService: ChatService) {
    this.authService.auth.subscribe((user) => {
      if (user !== null) {
        this.router.navigateByUrl('choice');
      }
    });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.minLength(6), Validators.maxLength(32), Validators.required]],
    });
    const url = this.router.url;
    this.roomId = url.substring(url.lastIndexOf('/')+1, url.length);
  }

  get username(): AbstractControl {
    return this.form.get('username');
  }

  public async onSubmit(): Promise<void> {
    try {
        this.chatService.hasRoom(this.roomId).subscribe(async hasRoom => {
          if(!hasRoom){
            this.toastService.showToast("The chat doesn't exist", 'toast-error');
          }else{
            const auth = await this.authService.loginAnonymous();
            const key = this.chatService.addMember(this.roomId, this.username.value)
            this.settingsService.guest.next({ ...this.settingsService.guest.value, firstname: this.username.value, roomId: this.roomId , id: key});
            this.toastService.showToast(auth.message, 'toast-success');
            this.router.navigateByUrl('choice');
          }
        });

    } catch (error) {
        this.toastService.showToast(error.message, 'toast-error');
    }
  }
}