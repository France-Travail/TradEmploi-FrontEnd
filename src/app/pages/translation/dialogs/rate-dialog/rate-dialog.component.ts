import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';
import { RateService } from 'src/app/services/rate.service';
import { ToastService } from 'src/app/services/toast.service';
import { VOCABULARY_NEW } from 'src/app/data/vocabulary';
import { Rate } from 'src/app/models/rate';
import { MatDialogRef } from '@angular/material';

interface Sentences {
  questionOne: { french: string; foreign: string };
  questionTwo: { french: string; foreign: string };
  questionThree: { french: string; foreign: string };
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
  };

  constructor(
    private dialogRef: MatDialogRef<RateDialogComponent>,
    private rateService: RateService,
    private settingsService: SettingsService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const rateFr = VOCABULARY_NEW.find(v => v.isoCode === 'fr-FR').sentences.rate;
    if (rateFr) {
      this.sentences.questionOne.french = rateFr.easyToUse;
      this.sentences.questionTwo.french = rateFr.understand;
      this.sentences.questionThree.french = rateFr.comment;
    }
    const vocabularyForeign = VOCABULARY_NEW.find(v => v.isoCode === this.settingsService.guest.value.language);
    const rateForeign = vocabularyForeign.sentences.rate;
    if (rateForeign) {
      this.sentences.questionOne.foreign = rateForeign.easyToUse;
      this.sentences.questionTwo.foreign = rateForeign.understand;
      this.sentences.questionThree.foreign = rateForeign.comment;
    }
    this.rate = {
      language: vocabularyForeign.languageNameFr,
      date: new Date(),
      grades: [undefined, undefined],
      comment: '',
    };
  }

  public eval(value: number, question: number) {
    this.rate.grades[question] = value + 1;
    this.rate.date = new Date();

    this.rateService.rateConversation(this.rate);

    this.rates[question].forEach((r, i) => {
      this.rates[question][i] = value >= i ? true : false;
    });
  }

  public confirm() {
    if (this.rate !== undefined) {
      this.rateService
        .saveRate()
        .then(() => {
          this.dialogRef.close();
          this.router.navigate(['thanks']);
        })
        .catch((error) => {
          this.dialogRef.close();
          this.toastService.showToast('La notation n\'a pas pu être envoyée. Redirection en cours.', 'toast-error');
          setTimeout(() => {
            this.router.navigate(['thanks']);
          }, 3500);
        });
    }
  }
}
