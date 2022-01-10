import { AfterViewInit, Component } from '@angular/core';
import { HistoryService } from '../../services/history.service';
import { Conversation } from '../../models/history/conversation';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements AfterViewInit {
  public conversation: Conversation;
  public showTranslation = false;

  constructor(private readonly historyService: HistoryService) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.conversation = this.historyService.conversation;
    });
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
