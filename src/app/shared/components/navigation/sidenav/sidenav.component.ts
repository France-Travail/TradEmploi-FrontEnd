import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LogoutComponent } from '../../logout/logout.component';
import { ShareComponent } from '../../../../pages/translation/dialogs/share/share.component';
import { SettingsService } from 'src/app/services/settings.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { Role } from 'src/app/models/role';
import { VOCABULARY_DEFAULT } from 'src/app/data/vocabulary';
import { RateDialogComponent } from 'src/app/pages/translation/dialogs/rate-dialog/rate-dialog.component';
import { OnboardingComponent } from 'src/app/pages/translation/dialogs/onboarding/onboarding.component';
import { GdprComponent } from '../../../../pages/gdpr/gdpr.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  @Output() sidenavClose = new EventEmitter();

  public choiceLink: string;
  public logoutLink: string;
  public helpLink: string;
  public gdprLink: string;
  public language: string;
  public userName: string;

  constructor(public dialog: MatDialog, public settingsService: SettingsService, public navbarService: NavbarService) {
    this.settingsService.user.subscribe((user) => {
      const isGuest = user !== null ? user.role === Role.GUEST : true;
      this.choiceLink = isGuest ? VOCABULARY_DEFAULT.navbarTabs.language : 'langues';
      this.logoutLink = isGuest ? VOCABULARY_DEFAULT.navbarTabs.logout : 'deconnexion';
      this.helpLink = isGuest ? VOCABULARY_DEFAULT.navbarTabs.help : 'Guide de démarrage';
      this.gdprLink = isGuest ? VOCABULARY_DEFAULT.navbarTabs.gdpr : 'cgu';
      this.language = isGuest ? 'english' : 'french';
      this.userName = user !== null ? [user.firstname, user.lastname].join('') : '';
    });
  }

  public onSidenavClose() {
    this.sidenavClose.emit();
  }

  public logout() {
    this.openModal(LogoutComponent);
  }

  public share() {
    this.openModal(ShareComponent);
  }

  public end() {
    this.settingsService.user.subscribe((user) => {
      if (user != null) {
        this.language = user.isMultiDevices ? this.settingsService.defaultLanguage.written : user.language.written;
        this.openModal(RateDialogComponent, [this.language]);
      }
    });
  }

  public help() {
    this.openModal(OnboardingComponent);
  }

  public gdpr() {
    this.dialog.open(GdprComponent, {
      panelClass: 'customDialog',
      width: '90%',
      height: '90%',
      data: {
        language: this.language
      }
    });
  }

  private openModal(component, guest?) {
    this.dialog.open(component, {
      width: '90%',
      height: '90%',
      panelClass: 'customDialog',
      data: {
        guest
      }
    });
  }
}
