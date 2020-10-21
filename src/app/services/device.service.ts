import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Device } from '../models/device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private deviceDetectorService: DeviceDetectorService) {

  }
  public getDeviceType() {
    const DeviceType = ["mobile", "desktop", "tablet"];
    let i = 1;
    const istablet: boolean = this.deviceDetectorService.isTablet() === true;
    const isMobile: boolean = this.deviceDetectorService.isMobile() === true;
    if (istablet) i += 1;
    if (isMobile) i -= 1
    return DeviceType[i];
  }

  public getUserDevice(): Device {

    return {
      type: this.getDeviceType(),
      os: this.deviceDetectorService.os,
      osVersion: this.deviceDetectorService.os_version,
      browser: this.deviceDetectorService.browser,
      browserVersion: this.deviceDetectorService.browser_version
    };
  }
}
