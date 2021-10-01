import {Component, Input, OnInit} from '@angular/core';
import {MessageWrapped} from '../../../../models/translate/message-wrapped';
import {Message} from 'src/app/models/translate/message';
import {SettingsService} from '../../../../services/settings.service';

@Component({
  selector: 'app-chat-multi-devices',
  templateUrl: './chat-multi-devices.component.html',
  styleUrls: ['./chat-multi-devices.component.scss'],
})
export class ChatMultiDevicesComponent implements  OnInit{
  @Input() messagesWrapped: MessageWrapped[];
  public peTitle: string = sessionStorage.getItem('user') ? 'Job consellor Pôle Emploi' : 'Conseiller Pôle Emploi';

  constructor(private settingsService: SettingsService) {
  }

  ngOnInit(): void {
    this.settingsService.user.subscribe(user => {
      if (user && user.firstname) {
        this.peTitle = user.firstname;
      }
    });
  }
  public listen(index) {
    const sentMessage: Message = this.messagesWrapped[index].message;
    if (sentMessage && sentMessage.audioHtml) {
      sentMessage.audioHtml.play();
    }
  }


}
