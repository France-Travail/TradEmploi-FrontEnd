import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LogoutComponent } from '../../logout/logout.component';
import { MatDialog } from '@angular/material';
import { ShareComponent } from '../../share/share.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  public title: string = 'Traduction Instantanée';
  public choiceLink: string = 'langues';
  public settingsLink: string = 'paramètres';
  public shareLink: string = 'partager';
  public logoutLink: string = 'deconnexion';
  private isMobile: boolean = false;

  constructor(public dialog: MatDialog) { }

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
