import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Message } from 'src/app/models/translate/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  @Input() messages: Message[];
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
    const sentMessage: Message = this.messages[index];
    this.editMessageEmit.emit(sentMessage);
    this.messages.splice(index, 1);
  }

  public listen(index) {
    const sentMessage: Message = this.messages[index];
    if (sentMessage && sentMessage.audioHtml) {
      sentMessage.audioHtml.play();
    }
  }
}
