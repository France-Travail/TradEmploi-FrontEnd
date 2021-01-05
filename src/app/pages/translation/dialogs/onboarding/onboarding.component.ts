import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Role } from 'src/app/models/role';
import { SettingsService } from 'src/app/services/settings.service';
import { onboardingTabs, onboardbingTitles } from '../../../../data/onboarding';
@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent implements OnInit {
  public sentences = onboardingTabs;
  public titles = onboardbingTitles;
  public i: number = 0;
  public isMobile: boolean;
  public isGuest: boolean;

  constructor(public dialogRef: MatDialogRef<OnboardingComponent>, private deviceService: DeviceDetectorService, private settingsService: SettingsService) {
    this.isMobile = this.deviceService.isMobile();
  }
  ngOnInit() {
    this.settingsService.user.subscribe((user) => {
      if (user !== null) {
        this.isGuest = user.role === Role.GUEST;
      }
    });
  }
  public nextItem() {
    this.i < this.sentences.length - 1 ? (this.i += 1) : (this.i = 0);
  }
  public previousItem() {
    this.i > 0 ? (this.i -= 1) : (this.i = this.sentences.length - 1);
  }

  public closeDialog() {
    this.dialogRef.close();
  }
}
