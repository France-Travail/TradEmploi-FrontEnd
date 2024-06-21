import { Component, Inject } from '@angular/core';
import { ChatService } from '../../../../services/chat.service';
import { Guest } from '../../../../models/db/guest';
import { LoaderComponent } from '../../../settings/loader/loader.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.scss'],
})
export class AuthorizeComponent {
  public name = '';
  public isLoading = false;

  constructor(
    private readonly dialogRef: MatDialogRef<AuthorizeComponent>,
    private readonly dialog: MatDialog,
    private readonly chatService: ChatService,
    @Inject(MAT_DIALOG_DATA) public data: { guest: Guest; roomId: string }
  ) {
    this.name = this.data.guest.firstname;
    setTimeout(() => {
      this.dialogRef.close();
    }, 30000);
  }

  public async accept() {
    this.isLoading = true;
    const loaderDialog = this.dialog.open(LoaderComponent, { panelClass: 'loader' });
    await this.chatService.updateGuestStatus(this.data.roomId, this.data.guest);
    this.isLoading = false;
    loaderDialog.close();
    this.dialogRef.close();
  }

  public refuse() {
    this.dialogRef.close();
  }
}
