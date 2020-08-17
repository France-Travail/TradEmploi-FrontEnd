import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  
  public user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public recordMode: boolean = false;
  public defaultLanguage = 'fr-FR'
  public defaultName = "Pôle emploi"

  constructor(private deviceService: DeviceDetectorService) {
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    if (isMobile || isTablet) {
      this.recordMode = true;
    }
  }

  reset = () => {
    this.user.next(null);
  }
}
