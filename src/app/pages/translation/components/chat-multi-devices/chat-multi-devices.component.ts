import {Component, Input, OnInit} from '@angular/core';
import {MessageWrapped} from '../../../../models/translate/message-wrapped';
import {Language} from '../../../../models/language';
import {SettingsService} from '../../../../services/settings.service';
import {TranslateService} from '../../../../services/translate.service';
import {Role} from '../../../../models/role';
import {Message} from '../../../../models/translate/message';
import {TextToSpeechService} from '../../../../services/text-to-speech.service';
import {VOCABULARY} from '../../../../data/vocabulary';

@Component({
  selector: 'app-chat-multi-devices',
  templateUrl: './chat-multi-devices.component.html',
  styleUrls: ['./chat-multi-devices.component.scss'],
})
export class ChatMultiDevicesComponent implements OnInit {
  @Input() messagesWrapped: MessageWrapped[];
  private targetLanguage: Language;
  public isAudioSupported: boolean;
  public showTraductionLogo = this.settingsService.showTraductionLogo;

  constructor(private readonly settingsService: SettingsService, private readonly textToSpeechService: TextToSpeechService, private readonly translateServce: TranslateService) {
  }

  ngOnInit(): void {
    this.settingsService.user.subscribe(async user => {
      if (user && user.firstname) {
        this.targetLanguage = user.language;
        if (user.role === Role.GUEST) {
          this.isAudioSupported = VOCABULARY.some((item) =>
            (item.isoCode === user.language.written && item.sentences.audioSupported));
          for (const message of this.messagesWrapped) {
            if (message.notification) {
              message.notification = await this.translateServce.translate(message.notification, this.targetLanguage.written);
            }
          }
        }
      }
    });
  }

  public listen(index) {
    const sentMessage: Message = this.messagesWrapped[index].message;
    if (sentMessage && sentMessage.audioHtml) {
      sentMessage.audioHtml.play();
    }
  }

  public async listenToNotification(index: number) {
    this.textToSpeechService.getSpeech(this.messagesWrapped[index].notification, this.targetLanguage.audio, false).then((_) => {
      this.textToSpeechService.audioSpeech.play();
      this.textToSpeechService.audioSpeech = undefined;
    }).catch((_) => {
      this.textToSpeechService.audioSpeech = undefined;
    });
  }

}
