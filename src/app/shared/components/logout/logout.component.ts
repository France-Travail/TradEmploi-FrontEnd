import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { ChatService } from '../../../services/chat.service';
import { SettingsService } from '../../../services/settings.service';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { Member } from 'src/app/models/db/member';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {

  private roomId: string;
  private isGuest: boolean = false;
  private user: User;

  constructor(
    private dialogRef: MatDialogRef<LogoutComponent>,
    public router: Router,
    private authService: AuthService,
    private chatService: ChatService,
    private settingsService: SettingsService,
  ) {
    this.settingsService.user.subscribe((user) => {
      if (user !== null && user.roomId !== undefined) {
        this.roomId = user.roomId;
        this.isGuest = user.role === Role.GUEST;
        this.user = user;
      }
    })
  }

  ngOnInit(): void {
  }

  public confirm() {
    this.dialogRef.close();
    this.authService.logout();
    // this.router.navigateByUrl('/');
    let member: Member = {id:this.user.id, firstname: this.user.firstname}
    this.chatService.addMemberDeleted(this.roomId, member);
    this.chatService.deleteMember(this.roomId, this.user.id)
    if (!this.isGuest) {
      this.chatService.delete(this.roomId);
    }
  }

  public cancel() {
    this.dialogRef.close();
  }
}
