import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RateDialogComponent } from '../translation/dialogs/rate-dialog/rate-dialog.component';

@Component({
  selector: 'app-tradtondoc',
  templateUrl: './tradtondoc.component.html',
  styleUrls: ['./tradtondoc.component.scss'],
})
export class TradtondocComponent implements OnInit {
  constructor(private readonly dialog: MatDialog) {}

  ngOnInit(): void {}

  public evaluate() {
    return this.dialog.open(RateDialogComponent, {
      width: '750px',
      height: '750px',
      panelClass: 'customDialog',
      disableClose: false,
      data: {
        tradtondoc: true,
      },
    });
  }
}
