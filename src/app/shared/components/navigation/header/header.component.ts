import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { LogoutComponent } from '../../logout/logout.component';
import { MatDialog } from '@angular/material';
import { ShareComponent } from '../../../../pages/translation/dialogs/share/share.component';
import { NavbarService } from '../../../../services/navbar.service';
import { SettingsService } from '../../../../services/settings.service';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
  @Input() user: string;

  public title: string = 'Traduction Instantanée';
  public choiceLink: string = 'langues';
  public settingsLink: string = 'paramètres';
  public shareLink: string = 'partager';
  public logoutLink: string = 'deconnexion';
  private isMobile: boolean = false;
  public isGuest: boolean = false;
  public isMultiDevices: boolean = false;

  constructor(
    public dialog: MatDialog,
    public navbarService: NavbarService,
    public settingsService: SettingsService
    ) {
      this.settingsService.user.subscribe((user) => {
        if(user !== null) {
          this.isGuest = true ? user.role === Role.GUEST : this.isGuest = false;
        }
      });
  }

  ngOnInit(): void {
  }

  public onToggleSidenav() {
    this.sidenavToggle.emit();
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
