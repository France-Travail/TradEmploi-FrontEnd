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
import { KpiService } from 'src/app/services/kpi.service';
import { Support } from 'src/app/models/support';

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

  constructor(
    private dialogRef: MatDialogRef<LogoutComponent>,
    public router: Router,
    private authService: AuthService,
    private chatService: ChatService,
    private settingsService: SettingsService,
    private kpiService: KpiService
  ) {
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
    console.log(this.settingsService.messages);
    this.roomId = (10000000 + Math.floor(Math.random() * 10000000)).toString();
    //this.chatService.create(this.roomId, Support.MONODEVICE);
  }

  private handleMulti() {
    this.settingsService.reset();
    if (this.isGuest) {
      this.chatService.notifyAdvisor(this.roomId, this.user.firstname, this.user.id);
      this.chatService.deleteMember(this.roomId, this.user.firstname, this.user.id);
    } else {
      this.chatService.updateChatStatus(this.roomId, false);
      this.chatService.delete(this.roomId);
    }
  }
  public cancel() {
    this.dialogRef.close();
  }
}
