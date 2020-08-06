import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LogoutComponent } from '../../logout/logout.component';
import { ShareComponent } from '../../../../pages/translation/dialogs/share/share.component';
import { SettingsService } from 'src/app/services/settings.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { Role } from 'src/app/models/role';
import { VOCABULARY_DEFAULT } from 'src/app/data/vocabulary';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  @Output() sidenavClose = new EventEmitter();

  public choiceLink: string = 'langues';
  public logoutLink: string = 'deconnexion';
  public isGuest: boolean = false;
  public isAdmin: boolean = false;

  constructor(
    public dialog: MatDialog,
    public settingsService: SettingsService,
    public navbarService: NavbarService,
    private deviceService: DeviceDetectorService
    ) {
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

  public onSidenavClose() {
    this.sidenavClose.emit();
  }

  public logout() {
    this.openModal(LogoutComponent);
  }

  public share() {
    this.openModal(ShareComponent)
  }

  private openModal(component) {
    const isMobile = this.deviceService.isMobile();
    this.dialog.open(component, {
      width: isMobile ? '90%' : '800px',
      height: isMobile ? '100%' : '300px',
      panelClass: 'customDialog'
    });
  }

}
