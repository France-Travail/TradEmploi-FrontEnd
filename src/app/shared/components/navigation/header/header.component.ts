import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LogoutComponent } from '../../logout/logout.component';
import { MatDialog } from '@angular/material';
import { ShareComponent } from '../../../../pages/translation/dialogs/share/share.component';
import { NavbarService } from '../../../../services/navbar.service';
import { SettingsService } from '../../../../services/settings.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GdprComponent } from '../../../../pages/gdpr/gdpr.component';
import { VOCABULARY_DEFAULT } from '../../../../data/vocabulary';
import { Role } from '../../../../models/role';
import { OnboardingComponent } from '../../../../pages/translation/dialogs/onboarding/onboarding.component';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();

  public choiceLink: string;
  public logoutLink: string;
  public helpLink: string;
  public gdprLink: string;
  public isSmallScreen: Observable<boolean>;
  public isWideScreen: Observable<boolean>;
  public language: string;
  public userName: string;

  constructor(
    public readonly dialog: MatDialog,
    public readonly navbarService: NavbarService,
    private readonly settingsService: SettingsService,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly chatService: ChatService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.isWideScreen = this.breakpointObserver.observe(['(min-width: 1051px)']).pipe(map(({ matches }) => matches));
    this.isSmallScreen = this.breakpointObserver.observe(['(max-width: 1050px)']).pipe(map(({ matches }) => matches));
    this.settingsService.user.subscribe((user) => {
      const isGuest = user !== null ? user.role === Role.GUEST : true;
      this.choiceLink = isGuest ? VOCABULARY_DEFAULT.navbarTabs.language : 'langues';
      this.logoutLink = isGuest ? VOCABULARY_DEFAULT.navbarTabs.logout : 'deconnexion';
      this.helpLink = isGuest ? VOCABULARY_DEFAULT.navbarTabs.help : 'Guide de démarrage';
      this.gdprLink = isGuest ? VOCABULARY_DEFAULT.navbarTabs.gdpr : 'cgu';
      this.language = isGuest ? 'english' : 'french';
      this.userName = user !== null ? user.firstname : '';
    });
  }

  public onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  public logout() {
    this.openModal(LogoutComponent, '300px');
  }

  public share() {
    this.openModal(ShareComponent, '500px');
  }

  public help() {
    this.openModal(OnboardingComponent, '680px');
  }

  public gdpr() {
    this.openGdprModal(GdprComponent);
  }

  public choice() {
    if (this.settingsService.user.value.role === Role.ADVISOR) {
      this.partialReset();
    }
    this.router.navigate(['/choice']);
  }

  private openGdprModal(component) {
    this.dialog.open(component, {
      panelClass: 'customDialog',
      data: {
        language: this.language,
      },
    });
  }

  private openModal(component, height) {
    this.dialog.open(component, {
      width: '800px',
      height,
      panelClass: 'customDialog',
    });
  }

  public partialReset = () => {
    const user = this.settingsService.user.value;
    const isMono = !user.isMultiDevices;
    const advisorRole = user.role;
    if (isMono) {
      this.chatService.initChatMono(null, advisorRole);
    } else {
      this.chatService.updateChatStatus(user.roomId, false);
      const newRoomId = this.chatService.createRoomId();
      this.settingsService.user.next({
        ...this.settingsService.user.value,
        isMultiDevices: false,
        roomId: newRoomId,
      });
      this.chatService.initChatMono(newRoomId, advisorRole);
    }
  };
}
