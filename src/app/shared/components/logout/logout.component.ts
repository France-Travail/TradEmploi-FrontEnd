import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { ChatService } from '../../../services/chat.service';
import { SettingsService } from '../../../services/settings.service';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { Logout } from 'src/app/models/vocabulary';
import { FRENCH, ENGLISH } from 'src/app/data/sentence';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent {
  public logoutWording: Logout;
  private roomId: string;
  private isGuest: boolean = false;
  private user: User;

  constructor(private dialogRef: MatDialogRef<LogoutComponent>, public router: Router, private authService: AuthService, private chatService: ChatService, private settingsService: SettingsService) {
    this.settingsService.user.subscribe((user: User) => {
      if (user !== null) {
        this.roomId = user.roomId ? user.roomId : undefined;
        this.isGuest = user.role === Role.GUEST;
        this.user = user;
        this.logoutWording = this.isGuest ? ENGLISH.logout : FRENCH.logout;
      }
    });
  }

  public async confirm() {
    this.dialogRef.close();
    if (this.roomId) {
      this.handleMulti();
    } else {
      this.handleMono();
    }
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  private handleMono() {
    const advisorRole: Role = this.user.role
    this.chatService.initChatMono(advisorRole);
  }

  private handleMulti() {
    if (this.isGuest) {
      this.chatService.notifyAdvisor(this.roomId, this.user.firstname);
      this.chatService.deleteMember(this.roomId, this.user.firstname);
    } else {
      this.chatService.updateChatStatus(this.roomId, false);
    }
    this.settingsService.reset();
  }
  public cancel() {
    this.dialogRef.close();
  }
}
