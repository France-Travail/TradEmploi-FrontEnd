import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private readonly snackBar: MatSnackBar) {}

  /**
   * Show a toast with a custom message
   */
  public showToast(message: string, type: string, duration: number = 5000, button: string = 'OK'): void {
    this.snackBar.open(message,  button, {
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [type],
    });
  }
  public closeToast(){
    this.snackBar.dismiss()
  }
}
