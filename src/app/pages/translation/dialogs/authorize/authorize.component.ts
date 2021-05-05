import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChatService } from 'src/app/services/chat.service';
import { Member } from 'src/app/models/db/member';
import { Guest } from 'src/app/models/db/guest';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.scss'],
})
export class AuthorizeComponent implements OnInit {

  public name:string = "";
  
  constructor(
    private dialogRef: MatDialogRef<AuthorizeComponent>,
    private chatService: ChatService,
    @Inject(MAT_DIALOG_DATA) public data: { guest: Guest, roomId: string }
  ) {
    // this.name = this.data.guests.map(g => {return g.id + ","}).toString()
    this.name = this.data.guest.id
    console.log('guests :>> ', this.data.guest);
    console.log('roomId :>> ', this.data.roomId);
  }

  ngOnInit(): void {
  }

  public async accept() {
    console.log("accept");
    // await this.chatService.deleteGuest(this.data.roomId, this.data.guest);
    // this.dialogRef.close();
    await this.chatService.updateGuestStatus(this.data.roomId, this.data.guest);
    this.dialogRef.close();
  }

  public refuse() {
    this.dialogRef.close();
  }

}
