import { Component, Input } from '@angular/core';
import { MessageWrapped } from '../../../../models/translate/message-wrapped';
import { Message } from 'src/app/models/translate/message';

@Component({
  selector: 'app-chat-multi-devices',
  templateUrl: './chat-multi-devices.component.html',
  styleUrls: ['./chat-multi-devices.component.scss'],
})
export class ChatMultiDevicesComponent {
  
  @Input() messagesWrapped: MessageWrapped[];

  public listen(index) {
    const sentMessage: Message = this.messagesWrapped[index].message;
    if (sentMessage && sentMessage.audioHtml) {
      sentMessage.audioHtml.play();
    }
  }
}
