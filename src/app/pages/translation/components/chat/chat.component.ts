import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { MessageWrapped } from 'src/app/models/translate/message-wrapped';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  @Input() messages: MessageWrapped[];
  @Input() shared: boolean;
  @Output() editMessageEmit = new EventEmitter();
  public visible: boolean = false;

  public extand() {
    this.visible = !this.visible;
  }

  public deleteMessage(index) {
    this.messages.splice(index, 1);
  }

  public editMessage(index) {
    const sentMessage: MessageWrapped = this.messages[index];
    this.editMessageEmit.emit(sentMessage);
    this.messages.splice(index, 1);
  }

  public listen(index) {
    const sentMessage: MessageWrapped = this.messages[index];
    if (sentMessage && sentMessage.message.audioHtml) {
      sentMessage.message.audioHtml.play();
    }
  }
}
