import {Component, Inject} from '@angular/core';
import { ENGLISH, FRENCH } from '../../data/sentence';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Gdpr } from '../../models/gdpr';

@Component({
  selector: 'app-gdpr',
  templateUrl: './gdpr.component.html',
  styleUrls: ['./gdpr.component.scss'],
})
export class GdprComponent {
  public selected = 'english';
  public isSmallScreen: boolean = false;
  public gdprWording: Gdpr = ENGLISH.gdpr;

  constructor(
    private readonly dialogRef: MatDialogRef<GdprComponent>,
    private readonly breakpointObserver: BreakpointObserver,
    @Inject(MAT_DIALOG_DATA) public data: { language: string }
  ) {
    this.breakpointObserver.observe(['(max-width: 1050px)']).subscribe((result) => {
      this.isSmallScreen = result.matches;
    });
    this.selected = this.data.language;
    this.gdprWording = this.selected === 'english' ? ENGLISH.gdpr : FRENCH.gdpr;

  }

  public chooseLanguage(option) {
    this.gdprWording = option.value === 'english' ? ENGLISH.gdpr : FRENCH.gdpr;
  }

  public closeDialog() {
    this.dialogRef.close();
  }
}
