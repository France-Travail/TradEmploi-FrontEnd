import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {DeviceDetectorService} from 'ngx-device-detector';
import {OnboardingComponent} from '../translation/dialogs/onboarding/onboarding.component';
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  public isMobile = false;
  public roomId: string;

  public showFranceTravailLogo = this.settingsService.showFranceTravailLogo;

  constructor(private readonly deviceService: DeviceDetectorService, private readonly router: Router, private readonly dialog: MatDialog, public readonly settingsService: SettingsService) {
    this.isMobile = this.deviceService.isMobile();
  }

  public agree() {
    const url = this.router.url;
    const roomId = url.substring(url.lastIndexOf('/') + 1, url.length);
    this.router.navigateByUrl('auth/' + roomId);
  }

  public help() {
    this.dialog.open(OnboardingComponent, {
      width: this.isMobile ? '90%' : '800px',
      height: this.isMobile ? '90%' : '680px',
      panelClass: 'customDialog',
      data: {
        guest: true,
      },
    });
  }
}
