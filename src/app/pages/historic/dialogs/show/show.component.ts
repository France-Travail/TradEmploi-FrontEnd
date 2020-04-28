// Angular
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Models
import { Conversation } from 'src/app/models/history/conversation';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent {
  public showTranslation: boolean = false;

  constructor(public dialogRef: MatDialogRef<ShowComponent>, @Inject(MAT_DIALOG_DATA) public data: Conversation) {}

  public switchLanguage(): void {
    this.showTranslation = !this.showTranslation;
  }

  public formatTime(value: number): string {
    const date: Date = new Date(value * 1000);

    let hour: any = date.getHours();
    let minute: any = date.getMinutes();

    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;

    return `${hour}:${minute}`;
  }
}
