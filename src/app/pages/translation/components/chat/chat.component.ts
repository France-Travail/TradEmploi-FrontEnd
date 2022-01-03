import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Message} from 'src/app/models/translate/message';
import {MessageWrapped} from 'src/app/models/translate/message-wrapped';
import {SettingsService} from '../../../../services/settings.service';
import {TextToSpeechService} from '../../../../services/text-to-speech.service';
import {Language} from '../../../../models/language';
import {VOCABULARY} from '../../../../data/vocabulary';

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
  private targetLanguage: Language;
  public isAudioSupported: boolean;

  constructor(private readonly settingsService: SettingsService, private readonly textToSpeechService: TextToSpeechService) {
  }

  ngOnInit(): void {
    this.settingsService.user.subscribe(async user => {
      if (user && user.firstname) {
        this.firstName = user.firstname;
        this.targetLanguage = user.language;
        this.isAudioSupported = VOCABULARY.some((item) =>
          (item.isoCode === user.language.written && item.sentences.audioSupported));
      }
    });
  }
  public listen(index: number) {
    const sentMessage: Message = this.messagesWrapped[index].message;
    if (sentMessage && sentMessage.audioHtml) {
      sentMessage.audioHtml.play();
    }
  }

  public async listenToMessage(index: number) {
    this.textToSpeechService.getSpeech(this.messagesWrapped[index].notification, this.targetLanguage.audio).then((_) => {
      this.textToSpeechService.audioSpeech.play();
      this.textToSpeechService.audioSpeech = undefined;
    }).catch((_) => {
      this.textToSpeechService.audioSpeech = undefined;
    });
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
