import { Component, Output, EventEmitter, Input } from '@angular/core';
import { LogoutComponent } from '../../logout/logout.component';
import { MatDialog } from '@angular/material';
import { ShareComponent } from '../../../../pages/translation/dialogs/share/share.component';
import { NavbarService } from '../../../../services/navbar.service';
import { SettingsService } from '../../../../services/settings.service';
import { Role } from 'src/app/models/role';
import { VOCABULARY_DEFAULT } from 'src/app/data/vocabulary';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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
  public isMobile: boolean;
  public isTablet: boolean;

  constructor(
    public dialog: MatDialog,
    public navbarService: NavbarService,
    public settingsService: SettingsService,
    private breakpointObserver: BreakpointObserver,
    ) {
      this.settingsService.user.subscribe((user) => {
        if(user !== null) {
          this.isGuest = user.role === Role.GUEST;
        }
        if(this.isGuest) {
          this.choiceLink = VOCABULARY_DEFAULT.navbarTabs.language;
          this.logoutLink = VOCABULARY_DEFAULT.navbarTabs.logout;
        }
      });
      this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
        this.isMobile = result.matches;
      });
      this.breakpointObserver.observe([Breakpoints.Tablet]).subscribe((result) => {
        this.isTablet = result.matches;
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
      height: this.isMobile ? '100%' : '300px',
      panelClass: 'customDialog'
    });
  }

}
