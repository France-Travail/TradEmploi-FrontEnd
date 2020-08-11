import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { User } from '../models/user';
import { Member } from '../models/db/member';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  
  public user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public members:  BehaviorSubject<Array<Member>> = new BehaviorSubject<Array<Member>>(null);
  public recordMode: boolean = false;
  public defaultLanguage = 'fr-FR'

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
