import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SettingsService } from '../../../../services/settings.service';
import { Language } from '../../../../models/language';
import { MessageWrapped } from '../../../../models/translate/message-wrapped';
import { Message } from '../../../../models/translate/message';
import { TextToSpeechService } from '../../../../services/text-to-speech.service';
import { params } from '../../../../../environments/params';
import { VOCABULARY } from '../../../../data/vocabulary';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @Input() messagesWrapped: MessageWrapped[];
  @Output() editMessageEmit = new EventEmitter();
  public messageNumberToFold: number;
  private firstName: string;
  private targetLanguage: Language;
  public isAudioSupported: boolean;
  public showPoleEmploiLogo = this.settingsService.showPoleEmploiLogo;

  constructor(private readonly settingsService: SettingsService, private readonly textToSpeechService: TextToSpeechService) {}

  ngOnInit(): void {
    this.settingsService.user.subscribe(async (user) => {
      if (user && user.firstname) {
        this.firstName = user.firstname.split(' ')[1] || params.organization.organizationUser;
        this.targetLanguage = user.language;
        this.isAudioSupported = VOCABULARY.some((item) => item.isoCode === user.language.written && item.sentences.audioSupported);
      }
    });
  }

  public listen(index: number) {
    const sentMessage: Message = this.messagesWrapped[index].message;
    if (sentMessage && sentMessage.audioHtml) {
      sentMessage.audioHtml.play();
    }else{
      this.listenToMessage(index);
    }
  }

  public async listenToMessage(index: number) {
    this.textToSpeechService.play(this.messagesWrapped[index].notification, this.targetLanguage.audio,
     true, false);
  }

  public unFold(messageIndex: number) {
    if (messageIndex === this.messageNumberToFold) {
      this.messageNumberToFold = -1;
    } else {
      this.messageNumberToFold = messageIndex;
    }
  }

  public foldMessage(message: Message) {
    return message.role === 'DE' ? '[See less]' : '[Voir moins]';
  }

  public unFoldMessage(message: Message) {
    return message.role === 'DE' ? '[See more]' : '[Voir plus]';
  }
}
