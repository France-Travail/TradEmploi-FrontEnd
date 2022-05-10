import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FRENCH } from '../../data/sentence';
import { NavbarService } from '../../services/navbar.service';
import { ChatService } from '../../services/chat.service';
import { SettingsService } from '../../services/settings.service';
import { Role } from '../../models/role';

@Component({
  selector: 'app-modality',
  templateUrl: './modality.component.html',
  styleUrls: ['./modality.component.scss'],
})
export class ModalityComponent implements OnInit {
  public sentences = FRENCH.modality;
  public target = 'mono';
  public checkIconStyle = "url('../../../assets/icons/check-circle.svg') no-repeat center center";
  public isSmallScreen = false;

  private roomId: string;

  constructor(
    private readonly router: Router,
    private readonly navbarService: NavbarService,
    private readonly chatService: ChatService,
    private readonly settingsService: SettingsService,
    private readonly breakpointObserver: BreakpointObserver
  ) {
    this.navbarService.handleTabModality();
    this.navbarService.show();
    this.breakpointObserver.observe(['(max-width: 1050px)']).subscribe((result) => {
      this.isSmallScreen = result.matches;
    });
  }

  ngOnInit(): void {
    this.settingsService.user.subscribe((user) => {
      if (user != null) {
        this.roomId = user.roomId;
      }
    });
  }

  public switchModality(current: string) {
    this.target = current;
  }

  public confirm(event: any): void {
    if (this.target === 'mono') {
      this.settingsService.user.next({ ...this.settingsService.user.value, isMultiDevices: false });
      this.router.navigateByUrl('choice');
    } else {
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
