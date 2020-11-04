import { SettingsService } from 'src/app/services/settings.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { ChatService } from 'src/app/services/chat.service';
import { Member } from 'src/app/models/db/member';
import { DeviceService } from 'src/app/services/device.service';
import { Support } from 'src/app/models/support';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent implements OnInit {
  public link: string;
  public canCreate: boolean = false;
  public qrCode: string;

  private roomId: string;

  constructor(private dialogRef: MatDialogRef<ShareComponent>, public router: Router, private chatService: ChatService, private settingsService: SettingsService, private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.settingsService.user.subscribe((user) => {
      if (user != null && user.roomId === undefined) {
        this.canCreate = true;
        this.roomId = this.chatService.getRoomId();
        this.link = window.location.origin + '/invite/' + this.roomId;
      } else {
        this.link = window.location.origin + '/invite/' + user.roomId;
      }
      this.qrCode = this.link;
    });
  }

  public copyLink() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.link;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  public confirm() {
    this.dialogRef.close();
  }
  public share() {
    this.settingsService.user.next({
      ...this.settingsService.user.value,
      language: { audio: this.settingsService.defaultLanguage.audio, written: this.settingsService.defaultLanguage.written , languageName: this.settingsService.defaultLanguage.languageName},
      roomId: this.roomId,
    });
    const user = JSON.parse(localStorage.getItem('user'));
    user.language = { audio: this.settingsService.defaultLanguage.audio, written: this.settingsService.defaultLanguage.written };
    user.roomId = this.roomId;
    localStorage.setItem('user', JSON.stringify(user));
    this.chatService.initChatMulti(this.roomId).then((_) => {
      this.dialogRef.close();
      const member: Member = { id: "1", firstname: this.settingsService.user.value.firstname, role: user.role, device: this.deviceService.getUserDevice() }; // TODO merge role
      this.chatService.addMember(this.roomId, member);
    });
  }

  public cancel() {
    this.dialogRef.close();
  }
}
