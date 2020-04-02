import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NewMessage } from 'src/app/models/new-message';

@Component({
  selector: 'app-conversation-thread',
  templateUrl: './conversation-thread.component.html',
  styleUrls: ['./conversation-thread.component.scss']
})
export class ConversationThreadComponent {

  @Input() user: string;
  @Input() rawText: string;
  @Input() conversationThread: [];

  @Output() textToEdit: any = new EventEmitter<{}>();

  public visible: boolean = false;

  public extand() {
    this.visible = !this.visible;
  }

  public deleteMessage(index) {
    this.conversationThread.splice(index, 1);
  }

  public editMessage(index) {
    const sentMessage: NewMessage = this.conversationThread[index];
    if (sentMessage) {
      this.textToEdit.emit({message: sentMessage.message, user: sentMessage.user});
      this.conversationThread.splice(index, 1);
    }
  }

  public listen(index) {
    const sentMessage: NewMessage = this.conversationThread[index];
    if (sentMessage) {
      sentMessage.translatedSpeech.play();
    }
  }

}
