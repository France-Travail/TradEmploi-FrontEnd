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
  public recordMode: boolean = true;
  public defaultLanguage: Language = { audio: 'fr-FR', written: 'fr-FR', languageName: 'Français' };
  public token: string;

  constructor(private deviceService: DeviceDetectorService) {
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    if (isMobile || isTablet) {
      this.recordMode = true;
    }
  }

  reset = () => {
    this.user.next(null);
    this.token = null;
    sessionStorage.removeItem('user');
    localStorage.removeItem('user');
  };
}

export const AdvisorDefaultName: string = 'Pôle emploi';
export const GuestDefaultName: string = 'DE';
