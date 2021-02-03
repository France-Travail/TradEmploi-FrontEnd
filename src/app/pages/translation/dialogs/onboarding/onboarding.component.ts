import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Role } from 'src/app/models/role';
import { Onboarding, OnboardingTitle } from 'src/app/models/vocabulary';
import { SettingsService } from 'src/app/services/settings.service';
import { onboardingTabs, onboardbingTitle, onboardingTabsAdvisor, onboardbingTitleAdvisor } from '../../../../data/onboarding';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent implements OnInit {
  public sentences: Onboarding[];
  public title: OnboardingTitle;
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
    console.log(this.isGuest)
    this.title = this.isGuest ? onboardbingTitle : onboardbingTitleAdvisor;
    this.sentences = this.isGuest ? onboardingTabs : onboardingTabsAdvisor;
  }
  public nextItem() {
    this.tabNumber < this.sentences.length - 1 ? (this.tabNumber += 1) : (this.tabNumber = 0);
  }
  public previousItem() {
    this.tabNumber > 0 ? (this.tabNumber -= 1) : (this.tabNumber = this.sentences.length - 1);
  }

  public closeDialog() {
    this.dialogRef.close();
  }
}
