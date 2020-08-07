import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Message } from 'src/app/models/translate/message';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { SettingsService } from 'src/app/services/settings.service';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-chat-multi',
  templateUrl: './chat-multi.component.html',
  styleUrls: ['./chat-multi.component.scss'],
})
export class ChatMultiComponent {
  @Input() chat: Message[];
  @Input() shared: boolean;
  @Output() editMessageEmit = new EventEmitter();

  // public notification: string;
  public isGuest: boolean = false;

  constructor(private chatService:ChatService, private settingsService: SettingsService) {
    this.settingsService.user.subscribe((user) => {
      if (user != null) {
        this.isGuest = user.role === Role.GUEST
      }
    })
    // this.chatService.onLogout().subscribe(member => {
    //   if(!this.isGuest) {
    //     console.log(member + `a quitter la discussion 1 .`)
    //     this.notification = `${member} a quitté la discussion 1 !`
    //   } else {
    //     console.log(`${member} a quitté la discussion 2 !`)
    //     this.notification = `${member} a quitté la discussion 2 !`
    //   }
    // })
  }

  public visible: boolean = false;

  public extand() {
    this.visible = !this.visible;
  }

  public listen(index) {
    const sentMessage: Message = this.chat[index];
    if (sentMessage && sentMessage.audioHtml) {
      sentMessage.audioHtml.play();
    }
  }
}
