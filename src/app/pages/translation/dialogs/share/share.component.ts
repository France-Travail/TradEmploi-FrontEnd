import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../../services/chat.service';
import { SettingsService } from '../../../../services/settings.service';
import { ToastService } from '../../../../services/toast.service';
import { Role } from '../../../../models/role';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent implements OnInit {
  public link: string;
  public canCreate = false;
  public qrCode: string;

  private roomId: string;

  constructor(
    private readonly dialogRef: MatDialogRef<ShareComponent>,

    private readonly chatService: ChatService,
    private readonly settingsService: SettingsService,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.settingsService.user.subscribe((user) => {
      if (user != null && !user.isMultiDevices) {
        this.canCreate = true;
        this.roomId = user.roomId;
        this.link = `${window.location.origin}/invite/${this.roomId}`;
      } else if (user) {
        this.link = `${window.location.origin}/invite/${user.roomId}`;
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
    this.toastService.showToast('Lien copié avec succès', 'toast-success', 2000);
    this.dialogRef.close();
  }

  public share() {
    this.initChat();
    this.userOnLocalStorage();
    this.dialogRef.close();
  }

  public close() {
    this.dialogRef.close();
  }

  private initChat() {
    const advisorRole: Role = this.settingsService.user.value.role;
    this.chatService.messagesStored.length > 0 ? this.initChatMonoMulti(advisorRole) : this.chatService.initChatMulti(this.roomId, advisorRole);
  }

  private initChatMonoMulti(advisorRole: Role) {
    this.chatService.initChatMonoMulti(this.roomId, advisorRole);
  }

  private userOnLocalStorage() {
    this.settingsService.user.next({
      ...this.settingsService.user.value,
      language: {
        audio: this.settingsService.defaultLanguage.audio,
        written: this.settingsService.defaultLanguage.written,
        languageName: this.settingsService.defaultLanguage.languageName,
      },
      roomId: this.roomId,
      isMultiDevices: true,
    });
    const user = JSON.parse(localStorage.getItem('user'));
    user.language = {
      audio: this.settingsService.defaultLanguage.audio,
      written: this.settingsService.defaultLanguage.written,
    };
    user.roomId = this.roomId;
    user.isMultiDevices = true;
    localStorage.setItem('user', JSON.stringify(user));
  }
}
