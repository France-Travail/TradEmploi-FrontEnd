import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MultiDevicesMessage } from '../../../../models/translate/multi-devices-message';
import { Message } from 'src/app/models/translate/message';

@Component({
  selector: 'app-chat-multi-devices',
  templateUrl: './chat-multi-devices.component.html',
  styleUrls: ['./chat-multi-devices.component.scss'],
})
export class ChatMultiDevicesComponent {
  @Input() multiDevicesMessages: MultiDevicesMessage[];
  @Output() editMessageEmit = new EventEmitter();

  public visible: boolean = false;

  public listen(index) {
    const sentMessage: Message= this.multiDevicesMessages[index].message;
    if (sentMessage && sentMessage.audioHtml) {
      sentMessage.audioHtml.play();
    }
  }
}
