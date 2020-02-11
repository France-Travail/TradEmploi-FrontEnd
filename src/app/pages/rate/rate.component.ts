// Angular
import { Component } from '@angular/core';
import { RateService } from 'src/app/services/rate.service';
import { Router } from '@angular/router';

// Services
import { TranslateService } from 'src/app/services/translate.service';
import { HistoryService } from 'src/app/services/history.service';
import { ToastService } from 'src/app/services/toast.service';

// Data
import { VOCABULARY } from 'src/app/data/vocabulary';

// Models
import { Rate } from 'src/app/models/rate';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent {
  private rate: Rate;

  public rates: boolean[] = [false, false, false, false, false];
  public send: string = 'Envoyer';
  // tslint:disable-next-line: quotemark
  public rateSentence: string = "Notez l'expérience";

  constructor(private rateService: RateService, private translateService: TranslateService, private historyService: HistoryService, private toastService: ToastService, private _router: Router) {
    this.send = VOCABULARY.find(v => v.isoCode === this.translateService.guest.writtenLanguage).words.send;
    this.rateSentence = VOCABULARY.find(v => v.isoCode === this.translateService.guest.writtenLanguage).words.rate;
  }

  /**
   *
   */
  public eval(value: number) {
    this.rate = {
      grade: value + 1,
      language: this.translateService.guest.writtenLanguage,
      date: new Date(),
      historyId: this.historyService.conversation.id
    };

    this.rateService.rateConversation(this.rate);

    this.rates.forEach((r, i) => {
      if (value >= i) {
        this.rates[i] = true;
      } else {
        this.rates[i] = false;
      }
    });
  }

  /**
   *
   */
  public confirm() {
    if (this.rate !== undefined) {
      this.rateService
        .saveRate()
        .then(() => {
          this._router.navigate(['thanks']);
        })
        .catch(error => {
          // tslint:disable-next-line: quotemark
          this.toastService.showToast("La notation n'a pas pu être envoyée. Redirection en cours.", 3000);
          setTimeout(() => {
            this._router.navigate(['thanks']);
          }, 3500);
        });
    }
  }
}
