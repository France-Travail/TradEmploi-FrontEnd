import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.scss']
})
export class RemoveComponent {
  constructor(public dialogRef: MatDialogRef<RemoveComponent>, @Inject(MAT_DIALOG_DATA) public data: { conversation: Conversation; service: HistoryService }) {}

  public cancel(): void {
    this.dialogRef.close('canceled');
  }

  public delete(): void {
    this.data.service
      .deleteById(this.data.conversation.id)
      .then(() => {
        this.dialogRef.close('removed');
      })
      .catch(error => {
        this.dialogRef.close('error');
      });
  }
}
