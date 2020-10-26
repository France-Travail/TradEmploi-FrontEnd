import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Device } from '../models/device';
import { DeviceType } from '../models/deviceType';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private deviceDetectorService: DeviceDetectorService) {

  }
  public getDeviceType() {
    const deviceType = Object.keys(DeviceType).map(key => ({id: key, name: DeviceType[key]})); 
    let i = 1;
    const istablet: boolean = this.deviceDetectorService.isTablet() === true;
    const isMobile: boolean = this.deviceDetectorService.isMobile() === true;
    if (istablet) i += 1;
    if (isMobile) i -= 1
    return deviceType[i].name;
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
