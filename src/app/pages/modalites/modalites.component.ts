import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role';
import { ChatService } from 'src/app/services/chat.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { SettingsService } from 'src/app/services/settings.service';
import { FRENCH } from '../../data/sentence';

@Component({
  selector: 'app-modalites',
  templateUrl: './modalites.component.html',
  styleUrls: ['./modalites.component.scss'],
})
export class ModalitesComponent implements OnInit {
  public sentences = FRENCH.modalites;
  public target = 'mono';
  public checkIconStyle = "url('../../../assets/icons/check-circle.svg') no-repeat center center";

  private roomId: string;
  constructor(private router: Router, private navbarService: NavbarService, private chatService: ChatService, private settingsService: SettingsService) {
    this.navbarService.handleTabModality();
    this.navbarService.show();
  }

  ngOnInit(): void {
    this.settingsService.user.subscribe((user) => {
      if (user != null && !user.isMultiDevices) {
        this.roomId = user.roomId;
      }
    });
  }

  public switchModalites(current: string) {
    this.target = current;
  }

  public confirm(): void {
    if (this.target === 'mono') {
      this.settingsService.user.next({ ...this.settingsService.user.value, isMultiDevices: false });
      this.router.navigateByUrl('gdpr/mono');
    } else {
      this.chatService.updateChatStatus(this.settingsService.user.value.roomId, false);
      this.share();
      this.router.navigateByUrl('translation');
    }
  }

  private share() {
    this.initChat();
    this.userOnLocalStorage();
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
      language: { audio: this.settingsService.defaultLanguage.audio, written: this.settingsService.defaultLanguage.written, languageName: this.settingsService.defaultLanguage.languageName },
      roomId: this.roomId,
      isMultiDevices: true,
    });
    const user = JSON.parse(localStorage.getItem('user'));
    user.language = { audio: this.settingsService.defaultLanguage.audio, written: this.settingsService.defaultLanguage.written };
    user.roomId = this.roomId;
    user.isMultiDevices = true;
    localStorage.setItem('user', JSON.stringify(user));
  }
}
