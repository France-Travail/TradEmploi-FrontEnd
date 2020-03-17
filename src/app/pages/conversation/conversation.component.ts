// Angular
import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { HistoryService } from 'src/app/services/history.service';

// Models
import { Conversation } from 'src/app/models/conversation';
import { NavbarItem } from 'src/app/models/navbar-item';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements AfterViewInit {
  public conversation: Conversation;
  public showTranslation: boolean = false;
  public navBarItems: NavbarItem[] = [];

  constructor(private historyService: HistoryService, private router: Router) {
    this.setNavBar();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.conversation = this.historyService.conversation;
    });
  }

  public setNavBar(): void {
    this.navBarItems = [
      {
        icon: 'assets/icons/icon-return-black.svg',
        infoTitle: 'RETOUR',
        link: 'translation',
        isDisplayed: true
      },
      {
        icon: 'assets/icons/icon-double-arrows-black.svg',
        infoTitle: 'CHANGER DE LANGUE',
        link: 'choice',
        isDisplayed: true
      },
      {
        icon: 'assets/icons/icon-settings-black.svg',
        infoTitle: 'PARAMÈTRES',
        link: 'settings/translation',
        isDisplayed: true
      }
    ];
  }

  public handleAction(event: any): void {
    event.call(this);
  }

  /**
   * Allow user to change the language of the conversation
   */
  public switchLanguage(): void {
    if (this.showTranslation === undefined) {
      this.showTranslation = false;
    } else {
      this.showTranslation = !this.showTranslation;
    }
  }

  /**
   * format time to return a string that contains hours and minutes only
   */
  public formatTime(date: Date): string {
    let hour: any = date.getHours();
    let minute: any = date.getMinutes();

    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;

    return `${hour}:${minute}`;
  }
}
