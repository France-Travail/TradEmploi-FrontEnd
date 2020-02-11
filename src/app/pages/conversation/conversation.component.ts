// Angular
import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { HistoryService } from 'src/app/services/history.service';

// Models
import { Conversation } from 'src/app/models/conversation';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements AfterViewInit {
  public conversation: Conversation;
  public showTranslation: boolean = false;

  constructor(private historyService: HistoryService, private router: Router) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.conversation = this.historyService.conversation;
    });
  }

  /**
   * Redirect to a page
   */
  public goto(where: string): void {
    this.router.navigate([where]);
  }

  /**
   * Allow user to change the language of the conversation
   */
  public switchLanguage(): void {
    this.showTranslation = !this.showTranslation;
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
