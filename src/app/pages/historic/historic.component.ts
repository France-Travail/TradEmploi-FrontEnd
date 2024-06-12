// Angular
import { Component, OnInit } from '@angular/core';
// Dialogs
import { ShowComponent } from './dialogs/show/show.component';
import { RemoveComponent } from './dialogs/remove/remove.component';
import { Conversation } from '../../models/history/conversation';
import { Rate } from '../../models/rate';
import { ToastService } from '../../services/toast.service';
import { HistoryService } from '../../services/history.service';
import { RateService } from '../../services/rate.service';
import { MatDialog } from '@angular/material/dialog';
import {ErrorService} from "../../services/error.service";


@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.scss']
})
export class HistoricComponent implements OnInit {
  public conversations: Conversation[] = []; // Contains all the conversations
  public rates: Rate[] = []; // Contains all the rates

  constructor(private readonly toastService: ToastService,
              private readonly historyService: HistoryService,
              private readonly rateService: RateService, private readonly dialog: MatDialog, private readonly errorService: ErrorService) {
  }

  ngOnInit() {
    this.historyService.getConversationForToday().subscribe(
      (response) => {
        this.conversations = this.sortByDate(response);
        for (const conversation of this.conversations) {
          this.rateService.getRateByHistoricId(conversation.id).subscribe((r) => {
            this.rates.push(r[0]);
          });
        }
      },
      this.errorService.handleAfsError
    );
  }

  /**
   * Display the modal that contains the conversation
   */
  public show(id: string): void {
    this.dialog.open(ShowComponent, {
      width: '900px',
      data: this.conversations.find((c) => c.id === id)
    });
  }

  /**
   * Display the modal that allows user to delete a conversation
   */
  public remove(id: string): void {
    this.dialog
      .open(RemoveComponent, {
        width: '400px',
        data: {
          conversation: this.conversations.find((c) => c.id === id),
          service: this.historyService
        }
      })
      .afterClosed()
      .subscribe((response) => {
        if (response === 'removed') {
          this.toastService.showToast('La conversation a été supprimée.', 'toast-info');
        } else if (response === 'error') {
          this.toastService.showToast('Une erreur a eu lieu. Merci de réessayer plus tard.', 'toast-error');
        }
      });
  }

  /**
   * Sort the result by date
   */
  private sortByDate(news: Conversation[]): Array<Conversation> {
    return news.sort((a, b) => {
      const d1: any = a.startDate;
      const d2: any = b.startDate;
      return d1.seconds - d2.seconds;
    });
  }

  /**
   * format time to return a string that contains hours and minutes only
   */
  public formatDate(timestamp: number): string {
    const date: Date = new Date(timestamp * 1000);
    const hour = date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
    const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;

    return `${hour}:${minute}`;
  }

  /**
   * Return the grade for a conversation
   */
  // public getRateById(id: string): number {
  //   return this.rates.find(r => r.historyId === id).grade;
  // }
}
