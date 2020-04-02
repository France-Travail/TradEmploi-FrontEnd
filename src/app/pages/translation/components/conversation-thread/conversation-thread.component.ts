import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NewMessage } from 'src/app/models/new-message';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-conversation-thread',
  templateUrl: './conversation-thread.component.html',
  styleUrls: ['./conversation-thread.component.scss']
})
export class ConversationThreadComponent {
  
  @Input() user: string;
  @Input() rawText: string;
  @Input() conversationThread: [];

  @Output() textToEdit: any = new EventEmitter<{}>();

  public messages = [];
  public flag: string;
  public translatedSpeech: HTMLAudioElement;
  public speech;
  public message: string;
  public visible = false;
  public element: NewMessage;
  public expandMessage: string;
  
  constructor(private toastService: ToastService) { }

  public toggleDiv(value) {
    this.visible = !this.visible;
    for (let i = 0; i < this.conversationThread.length; i++) {
      if (this.conversationThread.hasOwnProperty(value)) {
        this.element = this.conversationThread[value]
        this.expandMessage = this.element.message
        return this.expandMessage
      }
    }
  }

  public deleteMessage(index) {
    this.removeElement(this.conversationThread, index)
    return this.conversationThread
  }

  public removeElement(array, index) {
    array.splice(index, 1) ? (index > -1) : this.toastService.showToast('Une erreur a eu lieu. Merci de réessayer.');
}

  public editMessage(index) {
    for (let i = 0; i < this.conversationThread.length; i++) {
      if (this.conversationThread.hasOwnProperty(index)) {
        this.element = this.conversationThread[index];
        this.message = this.element.message;
        this.user = this.element.user;
        this.textToEdit.emit({message: this.message, user: this.user});
        this.removeElement(this.conversationThread, index);
        return
      }
    }
  }

  public listen(value) {
    for (let i = 0; i < this.conversationThread.length; i++) {
      if (this.conversationThread.hasOwnProperty(value)) {
        this.element = this.conversationThread[value]
        this.speech = this.element.translatedSpeech
        return this.speech.play()
      }
    }
  }

}
