import { Component, Inject } from '@angular/core';
import { ENGLISH, FRENCH } from '../../data/sentence';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SettingsService } from '../../services/settings.service';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  public selected = 'french';
  public isSmallScreen = false;
  public contactWording: Contact = FRENCH.contact;
  public showTraductionLogo = this.settingsService.showTraductionLogo;

  constructor(
    private readonly dialogRef: MatDialogRef<ContactComponent>,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly settingsService: SettingsService,
    @Inject(MAT_DIALOG_DATA) public data: { language: string }
  ) {
    this.breakpointObserver.observe(['(max-width: 1050px)']).subscribe((result) => {
      this.isSmallScreen = result.matches;
    });
    this.contactWording = this.selected === 'english' ? ENGLISH.contact : FRENCH.contact;
  }

  public chooseLanguage(option) {
    this.contactWording = option.value === 'english' ? ENGLISH.contact : FRENCH.contact;
  }

  public closeDialog() {
    this.dialogRef.close();
  }
}
