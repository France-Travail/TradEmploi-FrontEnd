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
import { RateDialogComponent } from 'src/app/pages/translation/dialogs/rate-dialog/rate-dialog.component';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() public sidenavToggle = new EventEmitter();

  public choiceLink: string = 'langues';
  public logoutLink: string = 'deconnexion';
  public helpLink: string = 'aide';
  public isSmallScreen: Observable<boolean>;
  public isWideScreen: Observable<boolean>;

  private isGuest: boolean = false;

  constructor(public dialog: MatDialog, public navbarService: NavbarService, public settingsService: SettingsService, private breakpointObserver: BreakpointObserver, private router: Router) {
    this.isWideScreen = this.breakpointObserver.observe(['(min-width: 821px)']).pipe(map(({ matches }) => matches));
    this.isSmallScreen = this.breakpointObserver.observe(['(max-width: 820px)']).pipe(map(({ matches }) => matches));
    this.settingsService.user.subscribe((user) => {
        if(user !== null){
          this.isGuest = user.role === Role.GUEST;
        }else{
          this.isGuest = true;
        }
        if (this.isGuest) {
          this.choiceLink = VOCABULARY_DEFAULT.navbarTabs.language;
          this.logoutLink = VOCABULARY_DEFAULT.navbarTabs.logout;
          this.helpLink = VOCABULARY_DEFAULT.navbarTabs.help;
        }else{
          this.choiceLink = 'langues'
          this.logoutLink = 'deconnexion'
          this.helpLink = 'aide'
        }
    })
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

  public end() {
    this.openModal(RateDialogComponent, '700px');
  }

  private openModal(component, height) {
    this.dialog.open(component, {
      width: '800px',
      height,
      panelClass: 'customDialog',
    });
  }
}
