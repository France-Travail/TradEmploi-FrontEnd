import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Message} from 'src/app/models/translate/message';
import {MessageWrapped} from 'src/app/models/translate/message-wrapped';
import {SettingsService} from '../../../../services/settings.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit{
  @Input() messagesWrapped: MessageWrapped[];
  @Output() editMessageEmit = new EventEmitter();
  public messageNumberToFold: number;
  private firstName: string;

  constructor(private settingsService: SettingsService) {
  }

  ngOnInit(): void {
    this.settingsService.user.subscribe(user => {
      if (user && user.firstname) {
        this.firstName = user.firstname;
      }
    });
  }
  public listen(index: number) {
    const sentMessage: Message = this.messagesWrapped[index].message;
    if (sentMessage && sentMessage.audioHtml) {
      sentMessage.audioHtml.play();
    }
  }
  public unFold(messageIndex: number) {
    messageIndex === this.messageNumberToFold ? (this.messageNumberToFold = -1) : (this.messageNumberToFold = messageIndex);
  }

  public foldMessage(message: Message, fold: boolean) {
    return message.role === 'DE' ? '[See less]' : '[Voir moins]';
  }
  public unFoldMessage(message: Message) {
    return message.role === 'DE' ? '[See more]' : '[Voir plus]';
  }

}
