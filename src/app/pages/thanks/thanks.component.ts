// Angular
import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

// Service
import { TranslateService } from 'src/app/services/translate.service';

// Data
import { VOCABULARY } from 'src/app/data/vocabulary';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.scss']
})
export class ThanksComponent implements AfterViewInit {
  public message: string = 'Pôle Emploi vous remercie.';

  constructor(private router: Router, private translateService: TranslateService) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.message = VOCABULARY.find(v => v.isoCode === this.translateService.guest.writtenLanguage).words.thanks;
    });

    setTimeout(() => {
      this.router.navigate(['start']);
    }, 3000);
  }
}
