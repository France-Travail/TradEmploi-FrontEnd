import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LogoutComponent } from '../../logout/logout.component';
import { ShareComponent } from '../../../../pages/translation/dialogs/share/share.component';
import { SettingsService } from 'src/app/services/settings.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { Role } from 'src/app/models/role';
import { VOCABULARY_DEFAULT } from 'src/app/data/vocabulary';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();

  public choiceLink: string = 'langues';
  public settingsLink: string = 'paramètres';
  public shareLink: string = 'partager';
  public logoutLink: string = 'deconnexion';
  private isMobile: boolean = false;
  public isGuest: boolean = false;
  public isMultiDevices: boolean = false;

  constructor(
    public dialog: MatDialog,
    public settingsService: SettingsService,
    public navbarService: NavbarService
    ) {
      this.settingsService.user.subscribe((user) => {
        if(user !== null) {
          this.isGuest = true ? user.role === Role.GUEST : this.isGuest = false;
        }
        if(this.isGuest) {
          this.choiceLink = VOCABULARY_DEFAULT.navbarTabs.language;
          this.logoutLink = VOCABULARY_DEFAULT.navbarTabs.logout;
        }
      });
    }

  ngOnInit(): void {
  }

  public onSidenavClose() {
    this.sidenavClose.emit();
  }

  public logout() {
    this.dialog.open(LogoutComponent, {
      width: this.isMobile ? '90%' : '800px',
      height: this.isMobile ? '100%' : '300px',
      panelClass: 'customDialog',
    });
  }

  public share() {
    this.dialog.open(ShareComponent, {
      width: this.isMobile ? '90%' : '800px',
      height: this.isMobile ? '100%' : '300px',
      panelClass: 'customDialog',
    });
  }

}
