import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';
import { RateService } from 'src/app/services/rate.service';
import { ToastService } from 'src/app/services/toast.service';
import { VOCABULARY_V2 } from 'src/app/data/vocabulary';
import { Rate } from 'src/app/models/rate';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-rate-dialog',
  templateUrl: './rate-dialog.component.html',
  styleUrls: ['./rate-dialog.component.scss']
})
export class RateDialogComponent implements OnInit {
  public rate: Rate;
  public rates: boolean[][] = [
    [false, false, false, false, false],
    [false, false, false, false, false]
  ];
  public sentences: { french: string[]; foreign: string[] } = { french: [], foreign: [] };

  constructor(private dialogRef: MatDialogRef<RateDialogComponent>, private rateService: RateService, private settingsService: SettingsService, private toastService: ToastService, private router: Router) {
    VOCABULARY_V2.find(v => v.isoCode === 'fr-FR').sentences.forEach(s => {
      if (s.key === 'rate-easyToUse') {
        this.sentences.french[0] = s.value;
      }
      if (s.key === 'rate-understand') {
        this.sentences.french[1] = s.value;
      }
      if (s.key === 'rate-comment') {
        this.sentences.french[2] = s.value;
      }
    });
    VOCABULARY_V2.find(v => v.isoCode === this.settingsService.guest.value.language).sentences.forEach(s => {
      if (s.key === 'rate-easyToUse') {
        this.sentences.foreign[0] = s.value;
      }
      if (s.key === 'rate-understand') {
        this.sentences.foreign[1] = s.value;
      }
      if (s.key === 'rate-comment') {
        this.sentences.foreign[2] = s.value;
      }
    });
  }

  ngOnInit(): void {
    this.rate = {
      date: new Date(),
      grades: [undefined, undefined],
      comment: ''
    };
    console.log(this.sentences);
  }

  public eval(value: number, question: number) {
    this.rate.grades[question] = value + 1;
    this.rate.date = new Date();

    this.rateService.rateConversation(this.rate);

    this.rates[question].forEach((r, i) => {
      if (value >= i) {
        this.rates[question][i] = true;
      } else {
        this.rates[question][i] = false;
      }
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
        .catch(error => {
          this.dialogRef.close();
          this.toastService.showToast("La notation n'a pas pu être envoyée. Redirection en cours.", 3000);
          setTimeout(() => {
            this.router.navigate(['thanks']);
          }, 3500);
        });
    }
  }
}
