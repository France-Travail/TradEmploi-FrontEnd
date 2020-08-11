import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Message } from 'src/app/models/translate/message';
import { ChatService } from 'src/app/services/chat.service';
import { SettingsService } from 'src/app/services/settings.service';
import { Role } from 'src/app/models/role';
import { ChatInput } from '../../../../models/chat-input';

@Component({
  selector: 'app-chat-multi',
  templateUrl: './chat-multi.component.html',
  styleUrls: ['./chat-multi.component.scss'],
})
export class ChatMultiComponent {
  @Input() chat: ChatInput[];
  @Output() editMessageEmit = new EventEmitter();

  public visible: boolean = false;

  public extand() {
    this.visible = !this.visible;
  }

  public listen(index) {
    const sentMessage: Message= this.chat[index].message;
    if (sentMessage && sentMessage.audioHtml) {
      sentMessage.audioHtml.play();
    }
  }
}
