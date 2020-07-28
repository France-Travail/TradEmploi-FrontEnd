import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { User } from '../models/user';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  
  private init: User = { id: '', firstname: '', lastname: '', language: {audio:'', written:''}, roomId: '', role: Role.GUEST}

  public user: BehaviorSubject<User> = new BehaviorSubject<User>(this.init);
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
    this.user.next(this.init);
  }
}
