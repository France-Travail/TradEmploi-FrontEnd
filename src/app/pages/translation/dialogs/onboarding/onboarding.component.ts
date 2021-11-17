import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Role } from 'src/app/models/role';
import { Onboarding } from 'src/app/models/vocabulary';
import { SettingsService } from 'src/app/services/settings.service';
import { onboardingTabs, onboardingTabsAdvisor } from '../../../../data/onboarding';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent implements OnInit {
  public sentences: Onboarding[];
  public title: string;
  public tabNumber: number = 0;
  public isMobile: boolean;
  public isGuest: boolean;

  constructor(
    public dialogRef: MatDialogRef<OnboardingComponent>,
    private deviceService: DeviceDetectorService,
    private settingsService: SettingsService,
    @Inject(MAT_DIALOG_DATA) public data: { guest: boolean }
  ) {
    this.isMobile = this.deviceService.isMobile();
  }
  ngOnInit() {
    this.settingsService.user.subscribe((user) => {
      this.isGuest = (user !== null ? user.role === Role.GUEST : this.isGuest === undefined) || this.data.guest;
    });
    this.sentences = this.isGuest ? onboardingTabs : onboardingTabsAdvisor;
    this.tabNumber = 0;
    this.setTitle();
  }
  public nextItem() {
    if (this.tabNumber === 2) {
      this.tabNumber = 0;
    } else if (this.tabNumber >= 0) {
      this.tabNumber++;
    }
    this.setTitle();
  }

  private setTitle() {
    switch (this.tabNumber) {
      case 0:
        this.title = 'Video d\'explication';
        break;
      case 1:
        this.title = 'Maitriser son environnement';
        break;
      case 2:
        this.title = 'Adapter son discours';
        break;
    }
  }

  public previousItem() {
    if (this.tabNumber === 0) {
      this.tabNumber = 2;
    } else if (this.tabNumber > 0) {
      this.tabNumber--;
    }
    this.setTitle();

  }

  public closeDialog() {
    this.dialogRef.close();
  }
}
