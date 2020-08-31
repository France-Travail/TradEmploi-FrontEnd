import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { SettingsService } from 'src/app/services/settings.service';
import { ChatService } from 'src/app/services/chat.service';

import { NavbarService } from 'src/app/services/navbar.service';
import { Member } from 'src/app/models/db/member';

@Component({
  selector: 'app-gdpr',
  templateUrl: './gdpr.component.html',
  styleUrls: ['./gdpr.component.scss'],
})
export class GdprComponent {
  public form: FormGroup;
  public privacyText: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac dolor sollicitudin, vestibulum nunc at, tristique velit. Vivamus tempor ligula dolor, id cursus leo feugiat sodales. Phasellus consequat lectus quis vestibulum iaculis. Vivamus luctus pharetra nunc non gravida. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean placerat sem vel pharetra facilisis. Proin aliquet libero nec arcu condimentum finibus. Sed venenatis sagittis lacus, sed suscipit lorem faucibus at. Nulla facilisi. Praesent efficitur blandit tortor quis congue. Pellentesque nec diam feugiat nulla semper faucibus. Donec hendrerit elementum ex id rhoncus.\nSed lobortis ante at nisi mollis sollicitudin. Nulla pharetra sollicitudin tortor sed pretium. Nulla tempus elit vitae lacus porttitor molestie. Nulla diam nisl, luctus sed nunc vel, aliquam euismod est. Nunc tempus sapien non elit sodales, non malesuada neque tempus. Ut libero ex, tincidunt ut diam eget, gravida vehicula tortor. Duis et iaculis odio. Pellentesque mollis risus nec nulla imperdiet, ut scelerisque nunc accumsan."

  public selected = 'option1';

  private roomId: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private chatService: ChatService,
    private settingsService: SettingsService,
    private navbarService: NavbarService
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
    this.navbarService.hide();
  }

  get username(): AbstractControl {
    return this.form.get('username');
  }

  public async onSubmit(): Promise<void> {
    try {
      this.chatService.hasRoom(this.roomId).subscribe(async (hasRoom) => {
        if (!hasRoom) {
          this.toastService.showToast("The chat doesn't exist", 'toast-error');
        } else {
          const auth = await this.authService.loginAnonymous();

          let member: Member = { id: auth.id, firstname: this.username.value };
          const key = this.chatService.addMember(this.roomId, member);
          this.settingsService.user.next({ ...this.settingsService.user.value, firstname: this.username.value, roomId: this.roomId, id: key });
          this.toastService.showToast(auth.message, 'toast-success');
          this.router.navigateByUrl('choice');
        }
      });
    } catch (error) {
      this.toastService.showToast(error.message, 'toast-error');
    }
  }
}
