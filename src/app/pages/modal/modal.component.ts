import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SettingsService } from '../../services/settings.service';
import { Modal } from '../../models/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  public selected = 'french';
  public title = '';
  public message = '';
  public close = '';
  public isSmallScreen = false;
  public showTraductionLogo = this.settingsService.showTraductionLogo;

  constructor(
    private readonly dialogRef: MatDialogRef<ModalComponent>,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly settingsService: SettingsService,
    @Inject(MAT_DIALOG_DATA) public globalData: { frenchData: Modal; englishData: Modal }
  ) {
    this.breakpointObserver.observe(['(max-width: 1050px)']).subscribe((result) => {
      this.isSmallScreen = result.matches;
    });
    this.title = this.globalData.frenchData.title;
    this.message = this.globalData.frenchData.message;
    this.close = this.globalData.frenchData.closeBtn;
  }

  public chooseLanguage(option) {
    this.title = option.value === 'english' ? this.globalData.englishData.title : this.globalData.frenchData.title;
    this.message = option.value === 'english' ? this.globalData.englishData.message : this.globalData.frenchData.message;
    this.close = option.value === 'english' ? this.globalData.englishData.closeBtn : this.globalData.frenchData.closeBtn;
  }


  public closeDialog() {
    this.dialogRef.close();
  }
}
