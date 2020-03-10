// Angular
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

// Services
import { TranslateService } from 'src/app/services/translate.service';
@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss']
})
export class TranslationComponent {
  constructor(private translateService: TranslateService, public dialog: MatDialog, private router: Router) {
    if (this.translateService.guest.audioLanguage === '') {
      this.goto('choice');
    }
  }

  public goto(where: string): void {
    this.router.navigate([where]);
  }

  public closeConversation(e) {
    this.goto('rate');
  }
}
