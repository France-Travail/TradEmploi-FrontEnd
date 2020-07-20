import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public advisor: User = { firstname: '', lastname: '', language: 'fr-FR' , roomId: '', id:''};
  public guest: BehaviorSubject<User> = new BehaviorSubject<User>({ firstname: '', lastname: '', language: '', roomId: '', id:'' });
  public audio: boolean = false;
  public newConversation: boolean = true;
  public recordMode: boolean = false;


  constructor(private deviceService: DeviceDetectorService) {
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    if (isMobile || isTablet) {
      this.recordMode = true;
    }
  }

  getTarget(): Observable<User> {
    return this.guest.asObservable();
  }

  public reset(): void {
    this.guest.next({ firstname: '', lastname: '', language: '', roomId:'' , id:''});
  }
}
