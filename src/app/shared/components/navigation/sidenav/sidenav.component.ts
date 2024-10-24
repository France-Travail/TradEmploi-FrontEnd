import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LogoutComponent } from '../../logout/logout.component';
import { ShareComponent } from '../../../../pages/translation/dialogs/share/share.component';
import { GdprComponent } from '../../../../pages/gdpr/gdpr.component';
import { SettingsService } from '../../../../services/settings.service';
import { NavbarService } from '../../../../services/navbar.service';
import { VOCABULARY_DEFAULT } from '../../../../data/vocabulary';
import { Role } from '../../../../models/role';
import { RateDialogComponent } from '../../../../pages/translation/dialogs/rate-dialog/rate-dialog.component';
import { OnboardingComponent } from '../../../../pages/translation/dialogs/onboarding/onboarding.component';
import { MatDialog } from '@angular/material/dialog';
import { PdataComponent } from '../../../../pages/pdata/pdata.component';
import { isAndroid } from '../../../../utils/utils';
import { params } from '../../../../../environments/params';
import { ContactComponent } from '../../../../pages/contact/contact.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();

  @Input() showCreateShortcut = false;
  @Input() deferredPrompt: any;
  public choiceLink: string;
  public logoutLink: string;
  public helpLink: string;
  public gdprLink: string;
  public contactLink: string;
  public language: string;
  public userName: string;
  public android: boolean;
  protected readonly params = params;

  constructor(private readonly dialog: MatDialog, private readonly settingsService: SettingsService, public readonly navbarService: NavbarService) {
    this.settingsService.user.subscribe((user) => {
      const isGuest = user !== null ? user.role === Role.GUEST : true;
      this.choiceLink = isGuest ? VOCABULARY_DEFAULT.navbarTabs.language : 'langues';
      this.logoutLink = isGuest ? VOCABULARY_DEFAULT.navbarTabs.logout : 'deconnexion';
      this.helpLink = isGuest ? VOCABULARY_DEFAULT.navbarTabs.help : 'Guide de démarrage';
      this.gdprLink = isGuest ? VOCABULARY_DEFAULT.navbarTabs.gdpr : 'cgu';
      this.contactLink = isGuest ? VOCABULARY_DEFAULT.navbarTabs.contact : 'contact';
      this.language = isGuest ? 'english' : 'french';
      this.userName = user !== null ? user.firstname : '';
    });
  }

  ngOnInit(): void {
    this.android = isAndroid();
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

  public contact() {
    this.dialog.open(ContactComponent, {
      panelClass: 'customDialog',
      width: '90%',
      height: '90%',
      data: {
        language: this.language
      }
    });
  }

  public pdata() {
    this.dialog.open(PdataComponent, {
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

  public createShortcut() {
    this.showCreateShortcut = false;
    this.deferredPrompt.prompt();
  }
}
