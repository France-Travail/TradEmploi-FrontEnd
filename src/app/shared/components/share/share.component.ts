import { SettingsService } from 'src/app/services/settings.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { ChatService } from 'src/app/services/chat.service';
import shortId from 'shortid';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent implements OnInit {
  public link: string;
  public canCreate: boolean = false;

  private roomId: string;

  constructor(private dialogRef: MatDialogRef<ShareComponent>, public router: Router, private chatService: ChatService, private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsService.user.subscribe((user) => {
      if (user!= null && user.roomId === undefined) {
        this.canCreate = true;
        this.roomId = shortId.generate();
        this.link = window.location.origin + '/invite/' + this.roomId;
      } else {
        this.link = window.location.origin + '/invite/' + user.roomId;
      }
    });
  }
  public confirm() {
    this.dialogRef.close();
  }
  public share() {
    this.settingsService.user.next({ ...this.settingsService.user.value, roomId: this.roomId})
    this.chatService.create(this.roomId).then((_) => this.dialogRef.close());
  }

  public cancel() {
    this.dialogRef.close();
  }
}
