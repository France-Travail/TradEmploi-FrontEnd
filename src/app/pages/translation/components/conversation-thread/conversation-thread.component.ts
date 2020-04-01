import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NewMessage } from 'src/app/models/new-message';

@Component({
  selector: 'app-conversation-thread',
  templateUrl: './conversation-thread.component.html',
  styleUrls: ['./conversation-thread.component.scss']
})
export class ConversationThreadComponent {
  
  @Input() user: string;
  @Input() rawText: string;
  @Input() conversationThread: [];

  @Output() textToEdit = new EventEmitter();

  public messages = [];
  public flag: string;
  public translatedSpeech: HTMLAudioElement;
  public speech;
  public message: string;
  public visible = false;
  public element: NewMessage;
  public expandMessage: string;
  
  constructor() { }

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
    array.splice(index, 1) ? (index > -1) : console.log('message not found')
}

  public editMessage(index) {
    console.log('edit : ', index)
    for (let i = 0; i < this.conversationThread.length; i++) {
      if (this.conversationThread.hasOwnProperty(index)) {
        this.element = this.conversationThread[index]
        this.message = this.element.message
        console.log('message to edit : ', this.message)
        this.textToEdit.emit(this.message)
        this.removeElement(this.conversationThread, index)
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
