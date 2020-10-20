import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private deviceService: DeviceDetectorService) { 

  }
  public getDeviceType() {
    const DeviceType = ["mobile", "desktop", "tablet"];
    let i = 1;
    const istablet: boolean = this.deviceService.isTablet() === true;
    const isMobile: boolean = this.deviceService.isMobile() === true;
    if (istablet) i += 1;
    if (isMobile) i -= 1
    return DeviceType[i];
  }
}
