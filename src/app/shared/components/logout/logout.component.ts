import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { ChatService } from '../../../services/chat.service';
import { SettingsService } from '../../../services/settings.service';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { Logout } from 'src/app/models/vocabulary';
import { VOCABULARY, VOCABULARY_DEFAULT } from 'src/app/data/vocabulary';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent {
  private roomId: string;
  private isGuest: boolean = false;
  private user: User;
  public logoutWording: Logout;
  constructor(private dialogRef: MatDialogRef<LogoutComponent>, public router: Router, private authService: AuthService, private chatService: ChatService, private settingsService: SettingsService) {
    this.settingsService.user.subscribe((user: User) => {
      if (user !== null && user.roomId !== undefined) {
        this.roomId = user.roomId;
        this.isGuest = user.role === Role.GUEST;
        this.user = user;
      }
    });
    const wording: Logout = VOCABULARY.find((item) => item.isoCode === this.user.language.written).sentences.logout;
    this.logoutWording = wording ? wording : VOCABULARY_DEFAULT.sentences.logout;
  }

  public confirm() {
    this.dialogRef.close();
    this.authService.logout();
    if (this.roomId) {
      this.settingsService.reset();
      if (this.isGuest) {
        this.chatService.deleteMember(this.roomId, this.user.firstname, this.user.id);
      } else {
        this.chatService.updateChatStatus(this.roomId, false);
        this.chatService.delete(this.roomId);
      }
    }
    this.router.navigateByUrl('/');
  }

  public cancel() {
    this.dialogRef.close();
  }
}
