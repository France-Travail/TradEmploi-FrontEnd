import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ENGLISH } from 'src/app/data/sentence';
import { FRENCH } from '../../data/sentence';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Gdpr } from 'src/app/models/gdpr';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-gdpr',
  templateUrl: './gdpr.component.html',
  styleUrls: ['./gdpr.component.scss'],
})
export class GdprComponent {
  public selected = 'english';
  public isMoreOptions: boolean = false;
  public isMobile: boolean = false;
  public gdprWording: Gdpr = ENGLISH.gdpr;

  constructor(
    private router: Router,
    private deviceService: DeviceDetectorService,
    private navbarService: NavbarService,
  ) {
    this.isMobile = this.deviceService.isMobile();
    this.navbarService.handleTabGDPR();
    this.navbarService.show();
  }

  public agree() {
    const url = this.router.url;
    if (url.includes('mono')) {
      this.router.navigateByUrl('choice');
    } else {
      const roomId = url.substring(url.lastIndexOf('/') + 1, url.length);
      this.router.navigateByUrl('auth/' + roomId);
    }
  }

  public moreOptions() {
    this.isMoreOptions = true;
    this.language({ value: this.selected });
  }

  public language(option) {
    this.gdprWording = option.value === 'english' ? ENGLISH.gdpr : FRENCH.gdpr;
  }
}
