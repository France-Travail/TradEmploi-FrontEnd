import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Device } from '../models/kpis/device';
import { DeviceType } from '../models/kpis/deviceType';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private readonly deviceDetectorService: DeviceDetectorService) {}

  public getUserDevice(): Device {
    return {
      type: this.getDeviceType(),
      os: this.deviceDetectorService.os,
      osVersion: this.deviceDetectorService.os_version,
      browser: this.deviceDetectorService.browser,
      browserVersion: this.deviceDetectorService.browser_version
    };
  }

  private getDeviceType() {
    const deviceType = Object.keys(DeviceType).map(key => ({id: key, name: DeviceType[key]}));
    let i = 1;
    const istablet: boolean = this.deviceDetectorService.isTablet();
    const isMobile: boolean = this.deviceDetectorService.isMobile();
    if (istablet) { i += 1; }
    if (isMobile) { i -= 1; }
    return deviceType[i].name;
  }

}
