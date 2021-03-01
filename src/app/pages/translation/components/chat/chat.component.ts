import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Message } from 'src/app/models/translate/message';
import { MessageWrapped } from 'src/app/models/translate/message-wrapped';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  @Input() messagesWrapped: MessageWrapped[];
  @Output() editMessageEmit = new EventEmitter();
  public messageNumberToFold: number;

  public listen(index: number) {
    const sentMessage: Message = this.messagesWrapped[index].message;
    if (sentMessage && sentMessage.audioHtml) {
      sentMessage.audioHtml.play();
    }
  }
  public unFold(messageIndex: number) {
    messageIndex === this.messageNumberToFold ? (this.messageNumberToFold = -1) : (this.messageNumberToFold = messageIndex);
  }

  public selectFoldWording(message: Message, fold: boolean) {
    if (fold) {
      return message.role === 'DE' ? '[See less]' : '[Voir moins]';
    } else {
      return message.role === 'DE' ? '[See more]' : '[Voir plus]';
    }
  }
}
