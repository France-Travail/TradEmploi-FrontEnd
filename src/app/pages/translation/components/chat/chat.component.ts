import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Message } from 'src/app/models/translate/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  @Input() user: string;
  @Input() rawText: string;
  @Input() chat: [];

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
    if (sentMessage && sentMessage.translatedSpeech) {
      sentMessage.translatedSpeech.play();
    }
  }
}
