import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../shared/components/custom-snackbar/custom-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private readonly snackBar: MatSnackBar) {
  }

  /**
   * Show a toast with a custom message
   */
  public showToast(message: string, type: string, duration = 5000, button = 'OK'): void {
    this.snackBar.open(message, button, {
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [type]
    });
  }

  public showUnavailableDomainToast() {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      duration: 10000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['mat-elevation-z3']
    });
  }


  public closeToast() {
    this.snackBar.dismiss();
  }
}
