import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DeviceDetectorService } from 'ngx-device-detector';
import { OnboardingTabs } from '../../../../data/onboarding';
@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent implements OnInit {
  public data = OnboardingTabs;
  public i: number = 0;
  public isMobile: boolean;

  constructor(public dialogRef: MatDialogRef<OnboardingComponent>, private deviceService: DeviceDetectorService) {
    this.isMobile = this.deviceService.isMobile();
  }

  ngOnInit(): void {}

  public nextItem() {
    this.i < this.data.length - 1 ? (this.i += 1) : (this.i = 0);
  }
  public previousItem() {
    this.i > 0 ? (this.i -= 1) : (this.i = this.data.length - 1);
  }

  public closeDialog() {
    this.dialogRef.close();
  }
}
