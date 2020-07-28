import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { LogoutComponent } from '../../logout/logout.component';
import { MatDialog } from '@angular/material';
import { ShareComponent } from '../../../../pages/translation/dialogs/share/share.component';
import { NavbarService } from '../../../../services/navbar.service';
import { SettingsService } from '../../../../services/settings.service';

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
    public navS: NavbarService,
    public settingsService: SettingsService
    ) {
    this.settingsService.getTarget().subscribe((user) => {
      this.isMultiDevices = user.roomId != '';
      this.isGuest = user.firstname != '' && user.firstname != null;
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
