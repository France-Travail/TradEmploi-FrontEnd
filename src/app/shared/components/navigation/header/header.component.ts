import { Component, Output, EventEmitter } from '@angular/core';
import { LogoutComponent } from '../../logout/logout.component';
import { MatDialog } from '@angular/material';
import { ShareComponent } from '../../../../pages/translation/dialogs/share/share.component';
import { NavbarService } from '../../../../services/navbar.service';
import { SettingsService } from '../../../../services/settings.service';
import { Role } from 'src/app/models/role';
import { VOCABULARY_DEFAULT } from 'src/app/data/vocabulary';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OnboardingComponent } from 'src/app/pages/translation/dialogs/onboarding/onboarding.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() public sidenavToggle = new EventEmitter();

  public choiceLink: string;
  public logoutLink: string;
  public helpLink: string;
  public isSmallScreen: Observable<boolean>;
  public isWideScreen: Observable<boolean>;

  constructor(public dialog: MatDialog, public navbarService: NavbarService, public settingsService: SettingsService, private breakpointObserver: BreakpointObserver) {
    this.isWideScreen = this.breakpointObserver.observe(['(min-width: 821px)']).pipe(map(({ matches }) => matches));
    this.isSmallScreen = this.breakpointObserver.observe(['(max-width: 820px)']).pipe(map(({ matches }) => matches));
    this.settingsService.user.subscribe((user) => {
      const isGuest = user !== null ? user.role === Role.GUEST : true;
      this.choiceLink = isGuest ? VOCABULARY_DEFAULT.navbarTabs.language : 'langues';
      this.logoutLink = isGuest ? VOCABULARY_DEFAULT.navbarTabs.logout : 'deconnexion';
      this.helpLink = isGuest ? VOCABULARY_DEFAULT.navbarTabs.help : 'aide';
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
    this.openModal(OnboardingComponent, '700px');
  }

  private openModal(component, height) {
    this.dialog.open(component, {
      width: '800px',
      height,
      panelClass: 'customDialog',
    });
  }
}
