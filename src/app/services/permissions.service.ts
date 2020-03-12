import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  public isAllowed: boolean = false;
  private constraints = { audio: true, video: false };

  public check(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices
        .getUserMedia(this.constraints)
        .then(result => {
          resolve(true);
        })
        .catch(error => {
          resolve(false);
        });
    });
  }
}
