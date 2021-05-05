import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChatService } from 'src/app/services/chat.service';
import { Member } from 'src/app/models/db/member';

@Component({
  selector: 'app-welcome-de',
  templateUrl: './welcome-de.component.html',
  styleUrls: ['./welcome-de.component.scss'],
})
export class WelcomeDeComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<WelcomeDeComponent>,
    private chatService: ChatService,
    @Inject(MAT_DIALOG_DATA) public data: { member: Member, roomId: string }
  ) {
  }

  ngOnInit(): void {
  }


}
