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

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
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

  constructor(public readonly dialog: MatDialog,
              public readonly navbarService: NavbarService,
              private readonly settingsService: SettingsService,
              private readonly breakpointObserver: BreakpointObserver,
              private readonly router: Router) {
  }

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
      this.userName = user !== null ? [user.firstname, user.lastname].join(' ') : '';
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
    this.router.navigate(['/choice']);
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
      panelClass: 'customDialog'
    });
  }
}
