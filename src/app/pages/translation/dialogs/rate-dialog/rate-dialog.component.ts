import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';
import { RateService } from 'src/app/services/rate.service';
import { ToastService } from 'src/app/services/toast.service';
import { VOCABULARY } from 'src/app/data/vocabulary';
import { Rate } from 'src/app/models/rate';
import { MatDialogRef } from '@angular/material';
import { ChatService } from 'src/app/services/chat.service';
import { ERROR_FUNC_SEND_STATS } from 'src/app/models/error/errorFunctionnal';

interface Sentences {
  questionOne: { french: string; foreign: string };
  questionTwo: { french: string; foreign: string };
  questionThree: { french: string; foreign: string };
  questionFour: { french: string; foreign: string };
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
  };
  private isMultiDevices: boolean;

  constructor(
    private dialogRef: MatDialogRef<RateDialogComponent>,
    private rateService: RateService,
    private settingsService: SettingsService,
    private toastService: ToastService,
    private router: Router,
    private chatService: ChatService
  ) {
    this.settingsService.user.subscribe((user) => {
      if (user !== null) {
        this.isMultiDevices = user.isMultiDevices;
      }
    });
  }

  ngOnInit(): void {
    const rateFr = VOCABULARY.find((v) => v.isoCode === 'fr-FR').sentences.rate;
    if (rateFr) {
      this.sentences.questionOne.french = rateFr.easyToUse;
      this.sentences.questionTwo.french = rateFr.understand;
      this.sentences.questionThree.french = rateFr.comment;
      this.sentences.questionFour.french = rateFr.offerLinked;
    }
    const vocabularyForeign = VOCABULARY.find((v) => v.isoCode === this.settingsService.user.value.language.written);
    const rateForeign = vocabularyForeign.sentences.rate;
    if (rateForeign) {
      this.sentences.questionOne.foreign = rateForeign.easyToUse;
      this.sentences.questionTwo.foreign = rateForeign.understand;
      this.sentences.questionThree.foreign = rateForeign.comment;
      this.sentences.questionFour.foreign = rateForeign.offerLinked;
    }
    const date = new Date();
    this.rate = {
      language: vocabularyForeign.languageNameFr,
      date: date,
      hour: date.getHours() + ':' + date.getMinutes(),
      grades: [undefined, undefined],
      comment: '',
      offerLinked: 'non',
    };
  }

  public eval(value: number, question: number) {
    const date = new Date();
    this.rate.grades[question] = value + 1;
    this.rate.date = date;
    this.rate.hour = date.getHours() + ':' + date.getMinutes();
    this.rateService.rateConversation(this.rate);

    this.rates[question].forEach((r, i) => {
      this.rates[question][i] = value >= i ? true : false;
    });
  }

  public confirm() {
    if (this.rate !== undefined) {
      this.rateService
        .saveRate()
        .then(async () => {
          this.dialogRef.close();
          const isMono = !this.isMultiDevices;
          const user = this.settingsService.user.value;
          if (isMono) {
            const advisorRole = user.role;
            this.chatService.initChatMono(user.roomId, advisorRole);
          } else {
            this.chatService.updateChatStatus(user.roomId, false);
          }
          this.settingsService.reset();
          this.router.navigate(['thanks']);
        })
        .catch(() => {
          this.dialogRef.close();
          this.toastService.showToast(ERROR_FUNC_SEND_STATS.description, 'toast-error');
          setTimeout(() => {
            this.router.navigate(['thanks']);
          }, 3500);
        });
    }
  }

  onItemChange(value) {
    this.rate.offerLinked = value;
  }
}
