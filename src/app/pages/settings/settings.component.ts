// Angular
import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { HistoryService } from 'src/app/services/history.service';
import { SettingsService } from 'src/app/services/settings.service';
import { ToastService } from 'src/app/services/toast.service';

// Models
import { NavbarItem } from 'src/app/models/navbar-item';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements AfterViewInit {
  public audio: boolean = false;
  public guest: { firstname: string; lastname: string } = { firstname: '', lastname: '' };
  public advisor: { firstname: string; lastname: string } = { firstname: '', lastname: '' };
  public isNewConversation: boolean = true; // Hide elements when new conversation is started
  public navBarItems: NavbarItem[] = [];

  constructor(private historyService: HistoryService, private toastService: ToastService, private settingsService: SettingsService, public router: Router) {
    this.setNavBar();
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
        icon: 'assets/icons/icon-return-black.svg',
        infoTitle: 'RETOUR',
        link: 'return',
        isDisplayed: !this.isNewConversation
      },
      // {
      //   icon: 'assets/icons/icon-refresh-black.svg',
      //   infoTitle: 'Quitter l\'application',
      //   link: 'start',
      //   isDisplayed: !this.isNewConversation
      // },
      {
        icon: 'assets/icons/icon-chat-black.svg',
        infoTitle: 'Voir l\'historique',
        link: 'history',
        isDisplayed: this.isNewConversation
      }
    ];
  }

  /**
   * Set firstname and lastname for users
   */
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

  /**
   * Allow user to enabled audio after translation
   */
  public switchAudio(): void {
    this.settingsService.audio = !this.audio;
  }

  /**
   * Validate form and redirect
   */
  public validateInformations(): void {
    if (this.checkFields()) {
      this.settingsService.newConversation = false;
      this.router.navigate(['choice']);
    } else {
      this.toastService.showToast('Merci de remplir tous les champs.');
    }
  }

  /**
   * Check if firstname and lastname are not empty
   */
  private checkFields(): boolean {
    if (this.advisor.firstname === '' || this.advisor.lastname === '') {
      return false;
    } else {
      return true;
    }
  }
}
