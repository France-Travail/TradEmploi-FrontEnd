import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {WelcomeDeComponent} from '../translation/dialogs/welcome-de/welcome-de.component';
import {AuthService} from '../../services/auth.service';
import {ToastService} from '../../services/toast.service';
import {ChatService} from '../../services/chat.service';
import {SettingsService} from '../../services/settings.service';
import {DeviceService} from '../../services/device.service';
import {TokenBrokerService} from '../../services/token-broker.service';
import {Support} from '../../models/kpis/support';
import {Role} from '../../models/role';
import {Member} from '../../models/db/member';
import {NavbarService} from '../../services/navbar.service';
import { MatDialog } from '@angular/material/dialog';
import firebase from 'firebase/compat/app';
import {ErrorService} from "../../services/error.service";


@Component({
  selector: 'app-anonymous',
  templateUrl: './anonymous.component.html',
  styleUrls: ['./anonymous.component.scss'],
})
export class AnonymousComponent implements OnInit {
  public form: UntypedFormGroup;
  public inProgress = false;
  private readonly roomId: string;
  public showTraductionLogo = this.settingsService.showTraductionLogo;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly toastService: ToastService,
    private readonly errorService: ErrorService,
    private readonly chatService: ChatService,
    private readonly settingsService: SettingsService,
    private readonly deviceService: DeviceService,
    private readonly navbarService: NavbarService,
    private readonly tbs: TokenBrokerService,
    private readonly dialog: MatDialog
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
      let end = false;
      let timer = 0;
      const maxOnSecond = 30;
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
          }, this.errorService.handleAfsError);
        }
        timer++;
      }, 1000);
    } catch (error) {
      this.toastService.showToast(error.message, 'toast-error');
    }
  }

  private disconnect() {
    firebase.auth().currentUser.delete();
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
    const member: Member = {
      id,
      firstname: this.username.value,
      role: Role.GUEST,
      device: this.deviceService.getUserDevice()
    };
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
        error,
      },
    });
  }
}
