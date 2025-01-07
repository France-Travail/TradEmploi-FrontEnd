import { Component, Inject } from '@angular/core';
import { ENGLISH, FRENCH } from '../../data/sentence';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SettingsService } from '../../services/settings.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-pdata',
  templateUrl: './pdata.component.html',
  styleUrl: './pdata.component.scss'
})
export class PdataComponent {
  public selected = 'french';
  public isSmallScreen = false;
  public pdataWording: String = ENGLISH.pdata;
  public showTraductionLogo = this.settingsService.showTraductionLogo;
  public pdataTitle: string = 'Données personnelles / Cookies';

  constructor(
    private readonly dialogRef: MatDialogRef<PdataComponent>,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly settingsService: SettingsService,
    @Inject(MAT_DIALOG_DATA) public data: { language: string }
  ) {
    this.breakpointObserver.observe(['(max-width: 1050px)']).subscribe((result) => {
      this.isSmallScreen = result.matches;
    });
    this.selected = this.data.language;
    this.pdataWording = this.selected === 'english' ? ENGLISH.pdata : FRENCH.pdata;

  }

  public chooseLanguage(option) {
    this.pdataWording = option.value === 'english' ? ENGLISH.pdata : FRENCH.pdata;
    this.pdataTitle = option.value === 'english' ? 'Personal Data / Cookies' : 'Données personnelles / Cookies';
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  protected readonly environment = environment;
}
