import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { User } from '../models/user';
import { Language } from '../models/language';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public recordMode: boolean = false;
  public defaultLanguage: Language = { audio: 'fr-FR', written: 'fr-FR', languageName: 'Français' };
  public defaultName: string = 'Pôle emploi';

  constructor(private deviceService: DeviceDetectorService) {
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    if (isMobile || isTablet) {
      this.recordMode = true;
    }
  }

  reset = () => {
    this.user.next(null);
    sessionStorage.setItem('user', null);
    localStorage.setItem('user', null);
  }
}
