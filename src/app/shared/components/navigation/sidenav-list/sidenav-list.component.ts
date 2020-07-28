import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LogoutComponent } from '../../logout/logout.component';
import { Router } from '@angular/router';
import { ShareComponent } from '../../../../pages/translation/dialogs/share/share.component';
import { SettingsService } from 'src/app/services/settings.service';

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
    public settingsService: SettingsService
    ) {
      this.settingsService.getTarget().subscribe((user) => {
        this.isMultiDevices = user.roomId != '';
        this.isGuest = user.firstname != '' && user.firstname != null;
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
