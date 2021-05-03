import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { SettingsService } from 'src/app/services/settings.service';
import { ChatService } from 'src/app/services/chat.service';
import { Member } from 'src/app/models/db/member';
import { Role } from 'src/app/models/role';
import { AngularFireAuth } from '@angular/fire/auth';
import { DeviceService } from 'src/app/services/device.service';
import { Support } from 'src/app/models/kpis/support';
import { ERROR_FUNC_UNKNOWCHAT } from 'src/app/models/error/errorFunctionnal';
import { NavbarService } from 'src/app/services/navbar.service';
import { LoaderComponent } from '../settings/loader/loader.component';

@Component({
  selector: 'app-anonymous',
  templateUrl: './anonymous.component.html',
  styleUrls: ['./anonymous.component.scss'],
})
export class AnonymousComponent implements OnInit {
  public form: FormGroup;
  public inProgress: boolean = false;
  private roomId: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private chatService: ChatService,
    private settingsService: SettingsService,
    private afAuth: AngularFireAuth,
    private deviceService: DeviceService,
    private navbarService: NavbarService,
    public dialog: MatDialog
  ) {
    this.navbarService.hide();
    const url = this.router.url;
    this.roomId = url.substring(url.lastIndexOf('/') + 1, url.length);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.minLength(2), Validators.maxLength(32), Validators.required]],
    });
  }

  get username(): AbstractControl {
    return this.form.get('username');
  }

  public async onSubmit(): Promise<void> {
    try {
      this.dialog.open(LoaderComponent, { panelClass: 'loader' });
      this.chatService.hasRoom(this.roomId).subscribe(async (hasRoom) => {
        !hasRoom ? this.onSubmitWithoutRoom() : await this.onSubmitWithRoom();
      });
    } catch (error) {
      this.toastService.showToast(error.message, 'toast-error');
    }
  }

  private onSubmitWithoutRoom(){
    this.dialog.closeAll();
    this.afAuth.auth.currentUser.delete();
    this.toastService.showToast(ERROR_FUNC_UNKNOWCHAT.description, 'toast-error');
    this.chatService.initUnknownChat(this.roomId);
    this.settingsService.user.next({...this.settingsService.user.value, roomId: this.roomId});
    this.router.navigate(['/start']);
  }

  private async onSubmitWithRoom(){
    const user = {
      roomId: this.roomId,
      connectionTime: Date.now(),
      firstname: this.username.value,
    };
    localStorage.setItem('isLogged', 'true');
    sessionStorage.setItem('user', JSON.stringify(user));
    const member: Member = { id: Date.now().toString(), firstname: this.username.value, role: Role.GUEST, device: this.deviceService.getUserDevice() };
    await this.chatService.addMember(this.roomId, member);
    const auth = await this.authService.loginAnonymous(this.roomId);
    this.chatService.support = Support.MONOANDMULTIDEVICE;
    this.settingsService.user.next({ ...this.settingsService.user.value, firstname: this.username.value, roomId: this.roomId, id: id, role: Role.GUEST, connectionTime: Date.now(), isMultiDevices: true });
    this.dialog.closeAll();
    this.toastService.showToast(auth.message, 'toast-success');
    this.router.navigateByUrl('gdpr/' + this.roomId);
  }
}
