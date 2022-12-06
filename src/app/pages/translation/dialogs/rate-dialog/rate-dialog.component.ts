import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { getDuration } from '../../../../utils/utils';
import { Role } from '../../../../models/role';
import { environment } from '../../../../../environments/environment';
import { Rate } from '../../../../models/rate';
import { RateService } from '../../../../services/rate.service';
import { SettingsService } from '../../../../services/settings.service';
import { ToastService } from '../../../../services/toast.service';
import { ChatService } from '../../../../services/chat.service';
import { VOCABULARY } from '../../../../data/vocabulary';
import { ERROR_FUNC_SEND_STATS } from '../../../../models/error/errorFunctionnal';
import { params } from '../../../../../environments/params';

interface Sentences {
  questionOne: { french: string; foreign: string };
  questionTwo: { french: string; foreign: string };
  questionThree: { french: string; foreign: string };
  questionFour: { french: string; foreign: string };
  questionFive: { french: string; foreign: string };
}

@Component({
  selector: 'app-rate-dialog',
  templateUrl: './rate-dialog.component.html',
  styleUrls: ['./rate-dialog.component.scss'],
})
export class RateDialogComponent implements OnInit {
  public rate: Rate;
  public rates: boolean[][] = [
    [false, false, false, false, false],
    [false, false, false, false, false],
  ];
  public sentences: Sentences = {
    questionOne: {
      french: '',
      foreign: '',
    },
    questionTwo: {
      french: '',
      foreign: '',
    },
    questionThree: {
      french: '',
      foreign: '',
    },
    questionFour: {
      french: '',
      foreign: '',
    },
    questionFive: {
      french: '',
      foreign: '',
    },
  };
  public canSendRate: boolean;
  private isMultiDevices: boolean;
  public typeEntretien: string;
  public types = params.organization.entretiens;
  public autreType = '';
  public isTradTonDoc: boolean;
  constructor(
    private readonly dialogRef: MatDialogRef<RateDialogComponent>,
    private readonly rateService: RateService,
    private readonly settingsService: SettingsService,
    private readonly toastService: ToastService,
    private readonly router: Router,
    private readonly chatService: ChatService,
    @Inject(MAT_DIALOG_DATA) public data: { guest: Array<string>; tradtondoc?: boolean }
  ) {
    this.isTradTonDoc = data.tradtondoc || false;
    this.settingsService.user.subscribe((user) => {
      if (user !== null) {
        this.isMultiDevices = user.isMultiDevices;
      } else {
        this.router.navigate(['/start']);
      }
    });
  }

  ngOnInit(): void {
    const rateFr = VOCABULARY.find((v) => v.isoCode === 'fr-FR').sentences.rate;
    let languageNameFr = 'fr-FR';
    let isoCodes;
    const date = new Date();
    if (rateFr) {
      this.sentences.questionOne.french = rateFr.qualityTranslate;
      this.sentences.questionTwo.french = rateFr.rating;
      this.sentences.questionThree.french = rateFr.comment;
      this.sentences.questionFour.french = rateFr.technical;
      this.sentences.questionFive.french = rateFr.typeInterview;
    }

    if (this.settingsService.user.value.language.written === 'fr-FR' || this.settingsService.user.value.language.written === 'fr-CA') {
      this.sentences.questionOne.foreign = '';
      this.sentences.questionTwo.foreign = '';
      this.sentences.questionThree.foreign = '';
      this.sentences.questionFour.foreign = '';
      this.sentences.questionFive.foreign = '';
    } else {
      const vocabularyForeign = VOCABULARY.find((v) => v.isoCode === this.settingsService.user.value.language.written);
      const rateForeign = vocabularyForeign.sentences.rate;
      if (rateForeign) {
        this.sentences.questionOne.foreign = rateForeign.qualityTranslate;
        this.sentences.questionTwo.foreign = rateForeign.rating;
        this.sentences.questionThree.foreign = rateForeign.comment;
        this.sentences.questionFour.foreign = rateForeign.technical;
        this.sentences.questionFive.foreign = rateForeign.typeInterview;
        languageNameFr = vocabularyForeign.isoCode;
      }
    }

    if (this.data.guest && this.data.guest.length > 0) {
      isoCodes = this.data.guest.filter((l, index) => l !== 'fr-FR' && this.data.guest.indexOf(l) === index).join(',');
      if (!isoCodes) {
        isoCodes = languageNameFr;
      }
    } else {
      isoCodes = languageNameFr;
    }

    this.rate = {
      language: isoCodes,
      date,
      hour: `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`,
      grades: [undefined, undefined],
      comment: '',
      offerLinked: 'non',
      conversationDuration: '',
      typeEntretien: this.typeEntretien,
      user: '',
      agency: '',
      nbMessagesGuest: 0,
      nbMessagesAdvisor: 0,
      typeSTT: '',
      isTradTonDoc: this.isTradTonDoc,
    };
    this.canSendRate = false;
  }

  public eval(value: number, question: number) {
    const date = new Date();
    this.rate.grades[question] = value + 1;
    this.rate.date = date;
    this.rate.hour = `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;

    let firstMessageTime = '00:00:00';
    let lastMessageTime = '00:00:00';
    this.rate.nbMessagesGuest = 0;
    this.rate.nbMessagesAdvisor = 0;
    const messagesStored = this.chatService.messagesStored;
    if (messagesStored) {
      const length = messagesStored.length;
      if (length > 0) {
        firstMessageTime = messagesStored[0].message.hour;
        lastMessageTime = messagesStored[length - 1].message.hour;
        this.fillNbMessages();
      }
    }
    this.rate.user = this.settingsService.user.value.idDGASI || 'Firebase User';
    this.rate.agency = this.settingsService.user.value.agency || 'None';
    this.rate.typeSTT = 'GCP';
    if (this.rate.language && this.fromAzure(this.rate.language)) {
      this.rate.typeSTT = 'Azure';
    }
    this.rate.conversationDuration = getDuration(lastMessageTime, firstMessageTime);
    this.rate.typeEntretien = this.getInterviewType();
    this.rateService.rateConversation(this.rate);

    this.rates[question].forEach((r, i) => {
      this.rates[question][i] = value >= i ? true : false;
    });
    this.setCanSendRate();
  }

  private fillNbMessages() {
    for (const messageWrapped of this.chatService.messagesStored) {
      if (messageWrapped.message) {
        if (messageWrapped.message.role === Role.GUEST) {
          this.rate.nbMessagesGuest++;
        }
        if (messageWrapped.message.role === Role.ADVISOR) {
          this.rate.nbMessagesAdvisor++;
        }
      }
    }
  }

  public setCanSendRate() {
    this.rate.typeEntretien = this.getInterviewType();
    this.canSendRate = this.rate && this.rate.grades && this.rate.grades[0] && this.rate.grades[1] && this.rate.typeEntretien && !!this.rate.offerLinked;
  }

  public confirm() {
    if (this.rate !== undefined) {
      this.canSendRate = false;
      this.rateService
        .saveRate()
        .then(async () => {
          this.dialogRef.close();
          const isMono = !this.isMultiDevices;
          const user = this.settingsService.user.value;
          const advisorRole = user.role;
          if (isMono) {
            this.chatService.initChatMono(null, advisorRole);
          } else {
            this.chatService.updateChatStatus(user.roomId, false);
            const newRoomId = this.chatService.createRoomId();
            this.settingsService.user.next({
              ...this.settingsService.user.value,
              isMultiDevices: false,
              roomId: newRoomId,
            });
            this.chatService.initChatMono(newRoomId, advisorRole);
          }
          this.isTradTonDoc ? this.router.navigate(['/translation']) : this.router.navigate(['choice']);
        })
        .catch(() => {
          this.toastService.showToast(ERROR_FUNC_SEND_STATS.description, 'toast-error');
          this.dialogRef.close();
          setTimeout(() => {
            this.router.navigate(['choice']);
          }, 3500);
        });
    }
  }

  onItemChange(value) {
    this.rate.offerLinked = value;
    this.setCanSendRate();
  }

  private getInterviewType(): string {
    if (this.typeEntretien === 'Autres') {
      return this.autreType;
    }
    return this.typeEntretien;
  }

  private fromAzure(language: string) {
    return environment.microsoftSpeechConfig.speechToTextEnabled && !params.excludedLanguagesFromAzureSTT.includes(language);
  }
  public closeModal() {
    this.dialogRef.close();
  }
}
