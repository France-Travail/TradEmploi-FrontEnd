import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { ChatService } from '../../../services/chat.service';
import { SettingsService } from '../../../services/settings.service';
import { Logout } from '../../../models/vocabulary';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';
import { Role } from '../../../models/role';
import { ENGLISH, FRENCH } from '../../../data/sentence';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent  {
  public logoutWording: Logout;
  private isGuest = false;
  private user: User;

  constructor(
    private readonly dialogRef: MatDialogRef<LogoutComponent>,
    private readonly router: Router,
    private readonly chatService: ChatService,
    private readonly settingsService: SettingsService,
    private readonly authService: AuthService
  ) {
    this.settingsService.user.subscribe((user: User) => {
      if (user !== null) {
        this.isGuest = user.role === Role.GUEST;
        this.user = user;
        this.logoutWording = this.isGuest ? ENGLISH.logout : FRENCH.logout;
      }
    });
  }

  public async confirm() {
    this.dialogRef.close();
    localStorage.setItem('isLogged', 'false');
    if (this.user.isMultiDevices) {
      await this.handleMulti();
    } else {
      await this.handleMono();
    }
  
    this.authService.logout();
    this.settingsService.reset();
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigateByUrl('/');
  }

  private async handleMono() {
    const advisorRole: Role = this.user.role;
    await this.chatService.initChatMono(this.user.roomId, advisorRole);
  }

  private async handleMulti() {
    if (this.isGuest) {
      await this.chatService.notifyAdvisor(this.user.roomId, this.user.firstname);
    } else {
      await this.chatService.updateChatStatus(this.user.roomId, false);
    }
  }
  public cancel() {
    this.dialogRef.close();
  }


}
