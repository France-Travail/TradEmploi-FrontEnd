import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { MessageWrapped } from '../../../../models/translate/message-wrapped';
import { Language } from '../../../../models/language';
import { SettingsService } from '../../../../services/settings.service';
import { TranslateService } from '../../../../services/translate.service';
import { Role } from '../../../../models/role';
import { Message } from '../../../../models/translate/message';
import { TextToSpeechService } from '../../../../services/text-to-speech.service';
import { VOCABULARY } from '../../../../data/vocabulary';

@Component({
  selector: 'app-chat-multi-devices',
  templateUrl: './chat-multi-devices.component.html',
  styleUrls: ['./chat-multi-devices.component.scss'],
})
export class ChatMultiDevicesComponent implements OnInit, OnDestroy {
  @Input() messagesWrapped: MessageWrapped[];
  private targetLanguage: Language;
  public isAudioSupported: boolean;
  public showPoleEmploiLogo = this.settingsService.showPoleEmploiLogo;

  constructor(private readonly settingsService: SettingsService, private readonly textToSpeechService: TextToSpeechService, private readonly translateService: TranslateService) {}

  ngOnInit(): void {
    this.settingsService.user.subscribe(async (user) => {
      if (user && user.firstname) {
        this.targetLanguage = user.language;
        if (user.role === Role.GUEST) {
          this.isAudioSupported = VOCABULARY.some((item) => item.isoCode === user.language.written && item.sentences.audioSupported);
          for (const message of this.messagesWrapped) {
            if (message.notification) {
              message.notification = await this.translateService.translate(message.notification, this.targetLanguage.written);
            }
          }
        }
      }
    });
  }
  ngOnDestroy(): void {
    if (this.textToSpeechService.audioSpeech) {
      this.textToSpeechService.stop();
    }
  }

  public listen(index) {
    const sentMessage: Message = this.messagesWrapped[index].message;
    this.textToSpeechService.play(sentMessage.translation, this.targetLanguage.audio);
  }

  public async listenToNotification(index: number) {
    this.textToSpeechService.play(this.messagesWrapped[index].notification, this.targetLanguage.audio);
  }
}
