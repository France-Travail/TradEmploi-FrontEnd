import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChatService } from '../../../../services/chat.service';
import { Guest } from '../../../../models/db/guest';
import { LoaderComponent } from '../../../settings/loader/loader.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.scss'],
})
export class AuthorizeComponent {

  public name = '';
  public isLoading: boolean;

  constructor(
    private readonly dialogRef: MatDialogRef<AuthorizeComponent>,
    private readonly dialog: MatDialog,
    private readonly chatService: ChatService,
    @Inject(MAT_DIALOG_DATA) public data: { guest: Guest, roomId: string }
  ) {
    this.name = this.data.guest.firstname;
    setTimeout(() => {
      this.dialogRef.close();
  }, 30000);
    this.isLoading = false;
  }

  public async accept() {
    this.isLoading = true;
    this.dialog.open(LoaderComponent, { panelClass: 'loader' });
    await this.chatService.updateGuestStatus(this.data.roomId, this.data.guest);
    this.isLoading = false;
    this.dialog.closeAll();
    this.dialogRef.close();
  }

  public refuse() {
    this.dialogRef.close();
  }

}
