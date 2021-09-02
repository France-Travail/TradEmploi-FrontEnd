import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChatService } from 'src/app/services/chat.service';
import { Guest } from 'src/app/models/db/guest';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.scss'],
})
export class AuthorizeComponent {

  public name:string = "";
  
  constructor(
    private dialogRef: MatDialogRef<AuthorizeComponent>,
    private chatService: ChatService,
    @Inject(MAT_DIALOG_DATA) public data: { guest: Guest, roomId: string }
  ) {
    this.name = this.data.guest.firstname
    setTimeout(() => {
      this.dialogRef.close();
  }, 30000);
  }

  public async accept() {
    await this.chatService.updateGuestStatus(this.data.roomId, this.data.guest);
    this.dialogRef.close();
  }

  public refuse() {
    this.dialogRef.close();
  }

}
