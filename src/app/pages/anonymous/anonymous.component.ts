import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { SettingsService } from 'src/app/services/settings.service';
import { ChatService } from 'src/app/services/chat.service';
import { Member } from 'src/app/models/db/member';
import { ErrorCodes } from 'src/app/models/errorCodes';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-anonymous',
  templateUrl: './anonymous.component.html',
  styleUrls: ['../../../sass/panel.scss'],
})
export class AnonymousComponent implements OnInit {
  public form: FormGroup;
  private roomId: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private chatService: ChatService,
    private settingsService: SettingsService
  ) {
    this.settingsService.user.subscribe((user) => {
      if (user !== null) {
        this.router.navigateByUrl('choice');
      }
    });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.minLength(2), Validators.maxLength(32), Validators.required]],
    });
    const url = this.router.url;
    this.roomId = url.substring(url.lastIndexOf('/') + 1, url.length);
  }

  get username(): AbstractControl {
    return this.form.get('username');
  }

  public async onSubmit(): Promise<void> {
    try {
      this.chatService.hasRoom(this.roomId).subscribe(async (hasRoom) => {
        if (!hasRoom) {
          this.toastService.showToast(ErrorCodes.NONEXISTANTCHAT, 'toast-error');
        } else {
          const auth = await this.authService.loginAnonymous();
          const member: Member = { id: auth.id, firstname: this.username.value };
          const key = this.chatService.addMember(this.roomId, member);
          this.settingsService.user.next({ ...this.settingsService.user.value, firstname: this.username.value, roomId: this.roomId, id: key, role: Role.GUEST });
          this.toastService.showToast(auth.message, 'toast-success');
          this.router.navigateByUrl('choice');
        }
      });
    } catch (error) {
      this.toastService.showToast(error.message, 'toast-error');
    }
  }
}
