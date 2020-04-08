import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<LogoutComponent>, public router: Router, private authService: AuthService) {}

  ngOnInit(): void {
  }

  public confirm() {
    this.dialogRef.close();
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  public cancel() {
    this.dialogRef.close();
  }
}
