import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { OnboardingComponent } from '../translation/dialogs/onboarding/onboarding.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  public isMobile: boolean = false;
  public roomId: string;

  constructor(private deviceService: DeviceDetectorService, private router: Router, public dialog: MatDialog) {
    this.isMobile = this.deviceService.isMobile();
  }

  public agree() {
    const url = this.router.url;
    const roomId = url.substring(url.lastIndexOf('/') + 1, url.length);
    this.router.navigateByUrl('auth/' + roomId);
  }
  public help() {
    this.dialog.open(OnboardingComponent, {
      width: '800px',
      height: '700px',
      panelClass: 'customDialog',
    });
  }
}
