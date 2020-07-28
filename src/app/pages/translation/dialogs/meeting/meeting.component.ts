// Angular
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

// Services
import { HistoryService } from 'src/app/services/history.service';
import { ToastService } from 'src/app/services/toast.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss']
})
export class MeetingComponent {
  public today: Date = new Date();
  public calendar: Array<Date[]> = [];
  public monthName: string = '';
  private month: Date = new Date();

  constructor(public dialogRef: MatDialogRef<MeetingComponent>, private toastService: ToastService, private historyService: HistoryService, private settingsService: SettingsService) {
    this.getDaysInMonth(this.today.getMonth(), this.today.getFullYear());
    this.monthName = this.today.toLocaleString('fr', { month: 'long' });
    this.monthName = this.monthName.charAt(0).toUpperCase() + this.monthName.slice(1);
  }

  public saveConversation() {
    if (this.historyService.conversation.conversation.length > 0) {
      this.historyService.conversation.guest.language = this.settingsService.user.value.language;
      this.historyService.saveConversation().then(() => {
        this.dialogRef.close('saved');
      });
    } else {
      this.toastService.showToast('Merci de démarer une conversation avant de prendre un rendez-vous.', 'toast-info');
    }
  }

  private getDaysInMonth(month: number, year: number): void {
    const date = new Date(Date.UTC(year, month, 1));
    let weeks: Date[] = [];
    const days: Date[] = [];

    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    days.forEach((d, i) => {
      if (d.getDay() === 0) {
        weeks.push(new Date(d));
        this.calendar.push(weeks);
        weeks = [];
      } else {
        weeks.push(new Date(d));
      }

      if (days.length === i + 1) {
        this.calendar.push(weeks);
      }
    });
  }

  public getDay(weeks: Date[], index: number): number | string {
    for (const e of weeks) {
      if (e.getDay() === index) {
        return e.getDate();
      }
    }

    return '';
  }

  public getMonth(weeks: Date[], index: number): number | string {
    for (const e of weeks) {
      if (e.getDay() === index) {
        return e.getMonth();
      }
    }

    return '';
  }

  public isTodayFromDay(date: Date): boolean {
    if (this.today.getDate() === date.getDate() && this.today.getMonth() === date.getMonth()) {
      return true;
    } else {
      return false;
    }
  }

  public isTodayFromWeek(week: Date[], index: number): boolean {
    if (this.getDay(week, index) === '') {
      return false;
    } else if (this.getDay(week, index) === this.today.getDate() && this.getMonth(week, index) === this.today.getMonth()) {
      return true;
    } else {
      return false;
    }
  }

  public changeMonth(way: string): void {
    const value = way === 'next' ? 1 : -1;
    const newMonth: Date = new Date(this.month.getFullYear(), this.month.getMonth() + value, 1);
    this.calendar = [];
    this.getDaysInMonth(newMonth.getMonth(), newMonth.getFullYear());
    this.monthName = newMonth.toLocaleString('fr', { month: 'long' });
    this.monthName = this.monthName.charAt(0).toUpperCase() + this.monthName.slice(1);
    this.month = newMonth;
  }
}
