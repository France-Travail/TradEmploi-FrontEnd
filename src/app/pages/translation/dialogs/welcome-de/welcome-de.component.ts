import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-welcome-de',
  templateUrl: './welcome-de.component.html',
  styleUrls: ['./welcome-de.component.scss'],
})
export class WelcomeDeComponent {

  public error: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { error: boolean }
  ) {
    this.error = this.data.error
  }

}
