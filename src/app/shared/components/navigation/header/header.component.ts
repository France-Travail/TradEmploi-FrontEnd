import { Component, Output, EventEmitter } from '@angular/core';
import { LogoutComponent } from '../../logout/logout.component';
import { MatDialog } from '@angular/material';
import { ShareComponent } from '../../../../pages/translation/dialogs/share/share.component';
import { NavbarService } from '../../../../services/navbar.service';
import { SettingsService } from '../../../../services/settings.service';
import { Role } from 'src/app/models/role';
import { VOCABULARY_DEFAULT } from 'src/app/data/vocabulary';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Output() public sidenavToggle = new EventEmitter();

  public choiceLink: string = 'langues';
  public logoutLink: string = 'deconnexion';
  public isGuest: boolean = false;
  public isAdmin: boolean = false;
  public isMobile: boolean = false;
  public isSmallScreen: Observable<boolean>;
  public isWideScreen: Observable<boolean>;

  constructor(
    public dialog: MatDialog,
    public navbarService: NavbarService,
    public settingsService: SettingsService,
    private breakpointObserver: BreakpointObserver,
    ) {
      this.isWideScreen = this.breakpointObserver
        .observe(['(min-width: 821px)'])
        .pipe(map(({ matches }) => matches));
      this.isSmallScreen = this.breakpointObserver
        .observe(['(max-width: 820px)'])
        .pipe(map(({ matches }) => matches));
      this.settingsService.user.subscribe((user) => {
        if(user !== null) {
          this.isGuest = user.role === Role.GUEST;
          this.isAdmin = user.role === Role.ADMIN;
        }
        if(this.isGuest) {
          this.choiceLink = VOCABULARY_DEFAULT.navbarTabs.language;
          this.logoutLink = VOCABULARY_DEFAULT.navbarTabs.logout;
        }
      });
  }

  public onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  public logout() {
    this.openModal(LogoutComponent);
  }

  public share() {
    this.openModal(ShareComponent)
  }

  private openModal(component) {
    this.dialog.open(component, {
      width: this.isMobile ? '90%' : '800px',
      height: this.isMobile ? '50%' : '300px',
      panelClass: 'customDialog'
    });
  }

}
