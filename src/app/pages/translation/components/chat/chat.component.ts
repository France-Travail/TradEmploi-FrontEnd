import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Message } from 'src/app/models/translate/message';
import { MessageWrapped } from 'src/app/models/translate/message-wrapped';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  @Input() messagesWrapped: MessageWrapped[];
  @Input() shared: boolean;
  @Output() editMessageEmit = new EventEmitter();

  constructor(private chatService: ChatService){}

  public visible: boolean = false;

  public extand() {
    this.visible = !this.visible;
  }

  public deleteMessage(index: number) {
    this.messagesWrapped.splice(index, 1);
    this.chatService.messagesStored.splice(index, 1);
  }

  public editMessage(index: number) {
    const sentMessage: Message = this.messagesWrapped[index].message;
    this.editMessageEmit.emit(sentMessage);
    this.messagesWrapped.splice(index, 1);
    this.chatService.messagesStored.splice(index, 1);
  }

  public listen(index: number) {
    const sentMessage: Message = this.messagesWrapped[index].message;
    if (sentMessage && sentMessage.audioHtml) {
      sentMessage.audioHtml.play();
    }
  }
}
