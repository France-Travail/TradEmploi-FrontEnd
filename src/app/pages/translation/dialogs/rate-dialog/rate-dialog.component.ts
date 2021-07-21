import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';
import { RateService } from 'src/app/services/rate.service';
import { ToastService } from 'src/app/services/toast.service';
import { VOCABULARY } from 'src/app/data/vocabulary';
import { Rate } from 'src/app/models/rate';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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
    private chatService: ChatService,
    @Inject(MAT_DIALOG_DATA) public data: { languages: Array<string> }
  ) {
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
    if (rateFr) {
      this.sentences.questionOne.french = rateFr.qualityTranslate;
      this.sentences.questionTwo.french = rateFr.rating;
      this.sentences.questionThree.french = rateFr.comment;
      this.sentences.questionFour.french = rateFr.technical;
    }
    let languageNameFr: string ='Français'
    if(this.settingsService.user.value.language.written === 'fr-FR' || this.settingsService.user.value.language.written === 'fr-CA'){
      this.sentences.questionOne.foreign = '';
      this.sentences.questionTwo.foreign = '';
      this.sentences.questionThree.foreign = '';
      this.sentences.questionFour.foreign = '';
    }else{
      const vocabularyForeign = VOCABULARY.find((v) => v.isoCode === this.settingsService.user.value.language.written);
      const rateForeign = vocabularyForeign.sentences.rate;
      if (rateForeign) {
        this.sentences.questionOne.foreign = rateForeign.qualityTranslate;
        this.sentences.questionTwo.foreign = rateForeign.rating;
        this.sentences.questionThree.foreign = rateForeign.comment;
        this.sentences.questionFour.foreign = rateForeign.technical;
        languageNameFr = vocabularyForeign.languageNameFr
      }
    }
    const languages = this.data.languages
      .filter(l => l !=='fr-FR')
      .map(l => VOCABULARY.find((v) => v.isoCode === l).languageNameFr)
      .join(',')
    const date = new Date();
    this.rate = {
      language: languages,
      date,
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
          localStorage.setItem('isLogged', 'false');
          this.settingsService.reset();
          this.router.navigate(['thanks']);
        })
        .catch(() => {
          this.toastService.showToast(ERROR_FUNC_SEND_STATS.description, 'toast-error');
          this.dialogRef.close();
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
