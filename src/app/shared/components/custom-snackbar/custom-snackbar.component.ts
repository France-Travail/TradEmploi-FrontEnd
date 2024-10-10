import { Component } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-snackbar',
  templateUrl: './custom-snackbar.component.html'
})
export class CustomSnackbarComponent {
  constructor(private snackBarRef: MatSnackBarRef<CustomSnackbarComponent>){}
  close(){
    this.snackBarRef.dismiss();
  }
}
