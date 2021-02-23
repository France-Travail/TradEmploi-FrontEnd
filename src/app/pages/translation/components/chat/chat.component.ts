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
  @Output() editMessageEmit = new EventEmitter();
  private fold: boolean;
  constructor(private chatService: ChatService) {
    this.fold = false;
    console.log(this.fold);
  }

  // public visible: boolean = false;

  public extand() {
    this.fold = !this.fold;
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
