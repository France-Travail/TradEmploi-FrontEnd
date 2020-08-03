import { MessageShared } from 'src/app/models/db/message-shared';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Message } from 'src/app/models/translate/message';
import { Chat } from 'src/app/models/db/chat';

@Component({
  selector: 'app-chat-multi',
  templateUrl: './chat-multi.component.html',
  styleUrls: ['./chat-multi.component.scss'],
})
export class ChatMultiComponent {
  @Input() chat: MessageShared[];
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
    const sentMessage: MessageShared = this.chat[index];
    this.editMessageEmit.emit(sentMessage);
    this.chat.splice(index, 1);
  }
}
