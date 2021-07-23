import {Component, EventEmitter, Output} from '@angular/core';
import {LogoutComponent} from '../../logout/logout.component';
import {MatDialog} from '@angular/material';
import {ShareComponent} from '../../../../pages/translation/dialogs/share/share.component';
import {NavbarService} from '../../../../services/navbar.service';
import {SettingsService} from '../../../../services/settings.service';
import {Role} from 'src/app/models/role';
import {VOCABULARY_DEFAULT} from 'src/app/data/vocabulary';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {OnboardingComponent} from 'src/app/pages/translation/dialogs/onboarding/onboarding.component';
import {GdprComponent} from '../../../../pages/gdpr/gdpr.component';

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
  public gdprLink: string;
  public isSmallScreen: Observable<boolean>;
  public isWideScreen: Observable<boolean>;
  public language: string;

  constructor(public dialog: MatDialog, public navbarService: NavbarService, public settingsService: SettingsService, private breakpointObserver: BreakpointObserver) {
    this.isWideScreen = this.breakpointObserver.observe(['(min-width: 1051px)']).pipe(map(({ matches }) => matches));
    this.isSmallScreen = this.breakpointObserver.observe(['(max-width: 1050px)']).pipe(map(({ matches }) => matches));
    this.settingsService.user.subscribe((user) => {
      const isGuest = user !== null ? user.role === Role.GUEST : true;
      this.choiceLink = isGuest ? VOCABULARY_DEFAULT.navbarTabs.language : 'langues';
      this.logoutLink = isGuest ? VOCABULARY_DEFAULT.navbarTabs.logout : 'deconnexion';
      this.helpLink = isGuest ? VOCABULARY_DEFAULT.navbarTabs.help : 'Guide de démarrage';
      this.gdprLink = isGuest ? VOCABULARY_DEFAULT.navbarTabs.gdpr : 'cgu';
      this.language = isGuest ? 'english' : 'french';
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

  private openGdprModal(component) {
    this.dialog.open(component, {
      panelClass: 'customDialog',
      data: {
        language: this.language
      }
    });
  }
  private openModal(component, height) {
    this.dialog.open(component, {
      width: '800px',
      height,
      panelClass: 'customDialog',
    });
  }
}
