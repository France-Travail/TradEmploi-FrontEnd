import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Message } from 'src/app/models/translate/message';

@Component({
  selector: 'app-chat-multi',
  templateUrl: './chat-multi.component.html',
  styleUrls: ['./chat-multi.component.scss'],
})
export class ChatMultiComponent {
  @Input() chat: Message[];
  @Input() shared: boolean;
  @Output() editMessageEmit = new EventEmitter();

  public visible: boolean = false;

  public extand() {
    this.visible = !this.visible;
  }

  public deleteMessage(index) {
    this.chat.splice(index, 1);
  }

  public editMessage(index) {
    const sentMessage: Message = this.chat[index];
    this.editMessageEmit.emit(sentMessage);
    this.chat.splice(index, 1);
  }

  public listen(index) {
    const sentMessage: Message = this.chat[index];
    if (sentMessage && sentMessage.audioHtml) {
      sentMessage.audioHtml.play();
    }
  }
}
