import {Component, Inject} from '@angular/core';
import {ENGLISH, FRENCH} from '../../data/sentence';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Gdpr} from '../../models/gdpr';
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-gdpr',
  templateUrl: './gdpr.component.html',
  styleUrls: ['./gdpr.component.scss'],
})
export class GdprComponent {
  public selected = 'english';
  public isSmallScreen = false;
  public gdprWording: Gdpr = FRENCH.gdpr;
  public showTraductionLogo = this.settingsService.showTraductionLogo;

  constructor(
    private readonly dialogRef: MatDialogRef<GdprComponent>,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly settingsService: SettingsService,
    @Inject(MAT_DIALOG_DATA) public data: { language: string }
  ) {
    this.breakpointObserver.observe(['(max-width: 1050px)']).subscribe((result) => {
      this.isSmallScreen = result.matches;
    });
    this.selected = this.data.language;
  }

  public closeDialog() {
    this.dialogRef.close();
  }
}
