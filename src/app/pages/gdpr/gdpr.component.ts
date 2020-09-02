import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ENGLISH } from 'src/app/data/sentence';
import { FRENCH } from '../../data/sentence';

@Component({
  selector: 'app-gdpr',
  templateUrl: './gdpr.component.html',
  styleUrls: ['./gdpr.component.scss'],
})
export class GdprComponent {

  public selected = 'english';
  public isMoreOptions: boolean = false;
  public privacyText: string = ENGLISH.gdpr.privacityText;
  public optionTitle: string = ENGLISH.gdpr.optionTitle;
  public optionText: string = ENGLISH.gdpr.optionText;

  constructor(
    private router: Router
  ) {}

  public agree() {
    const url = this.router.url;
    const roomId = url.substring(url.lastIndexOf('/') + 1, url.length);
    this.router.navigateByUrl('auth/' + roomId);
  }

  public moreOptions() {
    this.isMoreOptions = true;
    this.language({value: this.selected});
  }

  public language(option) {
    if (!this.isMoreOptions) {
      this.privacyText = (option.value === 'english') ? ENGLISH.gdpr.privacityText : FRENCH.gdpr.privacityText;
    } else {
      this.optionTitle = (option.value === 'english') ? ENGLISH.gdpr.optionTitle : FRENCH.gdpr.optionTitle;
      this.optionText = (option.value === 'english') ? ENGLISH.gdpr.optionText : FRENCH.gdpr.optionText;
    }
  }
}
