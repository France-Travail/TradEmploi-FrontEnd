import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { HistoryService } from 'src/app/services/history.service';
import { SettingsService } from 'src/app/services/settings.service';
import { ToastService } from 'src/app/services/toast.service';

import { NavbarItem } from 'src/app/models/navbar-item';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  public audio: boolean = false;
  public guest: { firstname: string; lastname: string } = { firstname: '', lastname: '' };
  public advisor: { firstname: string; lastname: string } = { firstname: '', lastname: '' };
  public isNewConversation: boolean = true;
  public navBarItems: NavbarItem[] = [];
  public isAdmin: boolean = false;

  constructor(
    private historyService: HistoryService,
    private toastService: ToastService,
    private settingsService: SettingsService,
    public router: Router,
    private authService: AuthService
  ) {
    this.setNavBar();
    this.authService.auth.subscribe(auth => {
      if (auth !== null) {
        this.isAdmin = auth.role === 'ADMIN';
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.historyService.conversation === undefined) {
        this.router.navigate(['start']);
      } else {
        this.guest.firstname = this.historyService.conversation.guest.firstname;
        this.guest.lastname = this.historyService.conversation.guest.lastname;
        this.advisor.firstname = this.historyService.conversation.advisor.firstname;
        this.advisor.lastname = this.historyService.conversation.advisor.lastname;
        this.audio = this.settingsService.audio;
        this.isNewConversation = this.settingsService.newConversation;
        this.setNavBar();
      }
    });
  }

  public setNavBar(): void {
    this.navBarItems = [
      {
        icon: 'assets/icons/icon-chat-black.svg',
        infoTitle: "Voir l'historique",
        link: 'history',
        isDisplayed: true
      },{
        icon: 'assets/icons/icon-logout.svg',
        infoTitle: 'Déconnexion',
        link: 'logout',
        isDisplayed: true,
      }
    ];
  }

  public setInformation(value: string, id: string): void {
    switch (id) {
      case 'guestF':
        this.historyService.conversation.guest.firstname = value;
        break;

      case 'guestL':
        this.historyService.conversation.guest.lastname = value;
        break;

      case 'advisorF':
        this.historyService.conversation.advisor.firstname = value;
        break;

      case 'advisorL':
        this.historyService.conversation.advisor.lastname = value;
        break;
    }
  }

  public switchAudio(): void {
    this.settingsService.audio = !this.audio;
  }

  public validateInformations(): void {
    if (this.checkFields()) {
      this.settingsService.newConversation = false;
      this.router.navigate(['choice']);
    } else {
      this.toastService.showToast('Merci de remplir tous les champs.', 'toast-info');
    }
  }

  private checkFields(): boolean {
    return !(this.advisor.firstname === '' || this.advisor.lastname === '');
  }

}
