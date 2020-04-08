import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackBar: MatSnackBar) {}

  /**
   * Show a toast with a custom message
   */
  public showToast = (message: string, type: string, duration: number = 3000, button: string = 'OK'): void => {
    this.snackBar.open(message, button == null ? button : button, {
      duration: duration == null ? duration : duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [type]
    });
  }
}
