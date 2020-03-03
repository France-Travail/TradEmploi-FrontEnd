import { Component, OnInit, Input } from '@angular/core';
import { COUNTRIES } from 'src/app/data/countries';
import { TranslateService } from 'src/app/services/translate.service';

export interface Countries {
  country: string;
  traduction: string;
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
  @Input() flag: string;
  @Input() user: string;

  // Number
  public enterKey: number = 13;

  // String
  public translatedValue: string = '';
  public text: string = '';
  public sendBtnValue: string = 'ENVOYER';
  public listenBtnValue: string = 'ECOUTER';

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {}

  public findLanguage(): void {
    console.log('findLanguage');
  }

  public talk(): void {}

  public delete(): void {}

  public send(user: string): void {
    console.log('input : ', this.text, this.user)
    this.translateService.translate(this.text, this.user).subscribe(res => {
      this.translatedValue = res
    })
  }

  public onPressEnter(event): void {
    if (event.which === this.enterKey || event.keyCode === this.enterKey) {
      this.text = event.currentTarget.value;
      this.send(this.user);
    }
  }

  public listen(value: 'translation' | 'speech'): void {}
}
