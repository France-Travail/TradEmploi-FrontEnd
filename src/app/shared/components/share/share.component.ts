import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<ShareComponent>, public router: Router) {}

  ngOnInit(): void {
  }

  public confirm() {
    this.dialogRef.close();
    this.router.navigateByUrl('/conversation');
  }

  public cancel() {
    this.dialogRef.close();
  }
}
