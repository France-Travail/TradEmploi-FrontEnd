import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { User } from '../models/user';
import { JwtFbSingleton } from '../models/token/JwtFbSingleton';
import { JwtGcpSingleton } from '../models/token/JwtGcpSingleton';
import { JwtGwSingleton } from '../models/token/JwtGwSingleton';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public user = new BehaviorSubject<User>(null);
  public recordMode = false;
  public defaultLanguage = { audio: 'fr-FR', written: 'fr-FR', languageName: 'Français' };
  public isMobile: boolean;
  public isTablet: boolean;

  constructor(private readonly deviceService: DeviceDetectorService) {
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    if (this.isMobile || this.isTablet) {
      this.recordMode = true;
    }
  }

  public reset = () => {
    this.user.next(null);
    localStorage.clear();
    sessionStorage.clear();
    JwtFbSingleton.getInstance().setToken(null);
    JwtGcpSingleton.getInstance().setToken(null);
    JwtGwSingleton.getInstance().setToken(null);
  };
}

export const AdvisorDefaultName = environment.organization.name;
export const GuestDefaultName = 'DE';
