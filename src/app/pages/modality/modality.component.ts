import {BreakpointObserver} from '@angular/cdk/layout';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Role} from 'src/app/models/role';
import {ChatService} from 'src/app/services/chat.service';
import {NavbarService} from 'src/app/services/navbar.service';
import {SettingsService} from 'src/app/services/settings.service';
import {FRENCH} from '../../data/sentence';
import {ClickInfo, TagService} from '../../lib/atinternet/_services/tag.service';

@Component({
  selector: 'app-modality',
  templateUrl: './modality.component.html',
  styleUrls: ['./modality.component.scss'],
})
export class ModalityComponent implements OnInit {
  public sentences = FRENCH.modality;
  public target = 'mono';
  public checkIconStyle = 'url(\'../../../assets/icons/check-circle.svg\') no-repeat center center';
  public isSmallScreen: Boolean = false;

  private roomId: string;

  constructor(private router: Router,
              private navbarService: NavbarService,
              private chatService: ChatService,
              private settingsService: SettingsService,
              private breakpointObserver: BreakpointObserver,
              private tagService: TagService) {
    this.navbarService.handleTabModality();
    this.navbarService.show();
    this.breakpointObserver.observe(['(max-width: 1050px)']).subscribe((result) => {
      this.isSmallScreen = result.matches;
    });
  }

  ngOnInit(): void {
    this.settingsService.user.subscribe((user) => {
      if (user != null && !user.isMultiDevices) {
        this.roomId = user.roomId;
      }
    });
  }

  public switchModality(current: string) {
    this.target = current;
  }

  public confirm(event: any): void {
    if (this.target === 'mono') {
      this.settingsService.user.next({...this.settingsService.user.value, isMultiDevices: false});
      this.router.navigateByUrl('choice');
    } else {
      this.share();
      this.router.navigateByUrl('translation');
    }
    const clickData: ClickInfo = {
      elem: event.target,
      name: this.target,
      chapter1: 'chap1',
      chapter2: 'chap2',
      chapter3: 'chap3',
      level2: '1',
      type: 'exit',
      event
    };
    this.tagService.click(clickData);
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
        languageName: this.settingsService.defaultLanguage.languageName
      },
      roomId: this.roomId,
      isMultiDevices: true,
    });
    const user = JSON.parse(localStorage.getItem('user'));
    user.language = {
      audio: this.settingsService.defaultLanguage.audio,
      written: this.settingsService.defaultLanguage.written
    };
    user.roomId = this.roomId;
    user.isMultiDevices = true;
    localStorage.setItem('user', JSON.stringify(user));
  }
}
