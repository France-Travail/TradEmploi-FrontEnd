import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  public isMobile: boolean = false;
  public roomId : string;

  constructor(private deviceService: DeviceDetectorService, private router: Router) {
    this.isMobile = this.deviceService.isMobile();
    const url = this.router.url;
    this.roomId = url.substring(url.lastIndexOf('/') + 1, url.length);
  }

  ngOnInit(): void {
  }

}
