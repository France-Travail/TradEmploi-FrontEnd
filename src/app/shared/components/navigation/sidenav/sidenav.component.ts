import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LogoutComponent } from '../../logout/logout.component';
import { SettingsService } from '../../../../services/settings.service';
import { NavbarService } from '../../../../services/navbar.service';
import { VOCABULARY_DEFAULT } from '../../../../data/vocabulary';
import { Role } from '../../../../models/role';
import { RateDialogComponent } from '../../../../pages/translation/dialogs/rate-dialog/rate-dialog.component';
import { OnboardingComponent } from '../../../../pages/translation/dialogs/onboarding/onboarding.component';
import { MatDialog } from '@angular/material/dialog';
import { isAndroid } from '../../../../utils/utils';
import { params } from '../../../../../environments/params';
import { ModalComponent } from '../../../../pages/modal/modal.component';
import { Modal } from '../../../../models/modal';
import { ENGLISH, FRENCH } from '../../../../data/sentence';

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
  public pdataFrench: Modal = FRENCH.pdata;
  public pdataEnglish: Modal = ENGLISH.pdata;
  public contactFrench: Modal = FRENCH.contact;
  public contactEnglish: Modal = ENGLISH.contact;
  public gdprFrench: Modal = FRENCH.gdpr;
  public gdprEnglish: Modal = FRENCH.gdpr;
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

  public openGenericModal(frenchData, englishData) {
    this.dialog.open(ModalComponent, {
      panelClass: 'customDialog',
      width: '90%',
      height: '90%',
      data: {
        frenchData,
        englishData
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
