import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from 'src/app/services/translate.service';
import { COUNTRIES } from '../../../../data/countries';
import { Router } from '@angular/router';

export interface Countries {
  country: string;
  traduction: string;
  flag: string;
  code: { audioLanguage: string; writtenLanguage: string };
  language: string;
}
@Component({
  selector: 'app-message-wrapper',
  templateUrl: './message-wrapper.component.html',
  styleUrls: ['./message-wrapper.component.scss']
})
export class MessageWrapperComponent implements OnInit {
  @Input() title: string;
  @Input() user: string;

  // Number
  public enterKey: number = 13;

  // String
  public translatedValue: string = '';
  public text: string = '';
  public sendBtnValue: string = 'ENVOYER';
  public listenBtnValue: string = 'ECOUTER';
  public flag : string;
  public country

  // Boolean
  public micro: boolean = false;

  public countries: Countries[] = COUNTRIES;

  constructor(private translateService: TranslateService, public router: Router) {}

  ngOnInit(): void {
    this.displayFlag(this.user)
  }

  public findLanguage(user): void {
    if (this.user == 'guest') {
      console.log('access ok')
      this.router.navigate(['choice']);
    }
    else console.log('no access')
  }

  public displayFlag(user) {
    if (this.user == 'advisor') {
      this.country = this.countries.find(element => element.flag == 'FR')
      this.flag = this.country.flag
    } else if (this.user == 'guest') {
      this.country = this.countries.find(element => element.code.writtenLanguage == this.translateService.guest.writtenLanguage)
      this.flag = this.country.flag
    }
  }

  public talk(): void {
    this.micro = true;
  }

  public delete(): void {
    this.text = '';
  }

  public send(user: string): void {
    this.translateService.translate(this.text, this.user).subscribe(res => {
      this.translatedValue = res;
    })
  }

  public listen(value: 'translation' | 'speech'): void {}
}
