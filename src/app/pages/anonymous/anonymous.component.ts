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
import { NavbarService } from 'src/app/services/navbar.service';
import { WelcomeDeComponent } from '../translation/dialogs/welcome-de/welcome-de.component';
import { TokenBrokerService } from 'src/app/services/token-broker.service';
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
    private tbs: TokenBrokerService,
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
      this.setStorage();
      const auth = await this.authService.loginAnonymous();
      this.tbs.addGuest(auth.token, this.roomId, this.username.value);
      this.openModal(WelcomeDeComponent, '200px', true);
      let end: boolean = false;
      let timer: number = 0;
      let maxOnSecond: number = 30;
      const timeValue = setInterval(async () => {
        if (end || timer === maxOnSecond) {
          clearInterval(timeValue);
          !end ? this.disconnect() : await this.connect(auth);
        } else {
          this.chatService.hasRoom(this.roomId).subscribe(async (hasRoom) => {
            if (hasRoom) {
              await this.addMember(auth.id);
              end = true;
            }
          });
        }
        timer++;
      }, 1000);
    } catch (error) {
      this.toastService.showToast(error.message, 'toast-error');
    }
  }

  private disconnect() {
    this.afAuth.auth.currentUser.delete();
    this.openModal(WelcomeDeComponent, '200px', true, true);
  }

  private async connect(auth) {
    this.chatService.support = Support.MONOANDMULTIDEVICE;
    this.settingsService.user.next({
      ...this.settingsService.user.value,
      firstname: this.username.value,
      roomId: this.roomId,
      id: auth.id,
      role: Role.GUEST,
      connectionTime: Date.now(),
      isMultiDevices: true,
    });
    this.dialog.closeAll();
    this.toastService.showToast(auth.message, 'toast-success');
    this.router.navigateByUrl('choice');
  }

  private async addMember(id: string) {
    const member: Member = { id: id, firstname: this.username.value, role: Role.GUEST, device: this.deviceService.getUserDevice() };
    await this.chatService.addMember(this.roomId, member);
  }

  private setStorage() {
    const user = {
      roomId: this.roomId,
      connectionTime: Date.now(),
      firstname: this.username.value,
    };
    localStorage.setItem('isLogged', 'true');
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  private openModal(component, height, disableClose, error?) {
    return this.dialog.open(component, {
      width: '800px',
      height,
      panelClass: 'customDialog',
      disableClose,
      data: {
        error: error,
      },
    });
  }
}
