import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message-wrapper',
  templateUrl: './message-wrapper.component.html',
  styleUrls: ['./message-wrapper.component.scss']
})
export class MessageWrapperComponent implements OnInit {
  @Input() title: string;
  @Input() flag: string;

  public translatedValue: string = '';
  public text: string = '';

  constructor() {}

  ngOnInit(): void {}

  public findLanguage(): void {
    console.log('findLanguage');
  }

  public talk(): void {}

  public delete(): void {}

  public send(): void {}

  public listen(value: 'translation' | 'speech'): void {}
}
