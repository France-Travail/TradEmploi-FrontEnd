import { ErrorDetail, ErrorType } from '../models/error/errorType';
import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastService } from './toast.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {
    private readonly db: string = 'errors';

    constructor(private readonly afs: AngularFirestore, private readonly settingService: SettingsService, private readonly toastService: ToastService, private readonly router: Router) {}

    public save(detail: ErrorDetail): Promise<void> {
        const roomId: string = this.settingService.user.value.roomId;
        const date = new Date();
        const day = date.toLocaleDateString('fr-FR');
        const hour = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        const error: ErrorType = {
            roomId,
            day,
            hour,
            detail
        };
        return this.afs
        .collection(this.db)
        .doc<ErrorType>(this.afs.createId())
        .set(error);
    }

    public handleAfsError(error){
      console.error(error);
      if (error.code === 'permission-denied' || error.code === 'unauthenticated'){
        this.handleAuthenticationError();
      } else {
        this.toastService.showToast('Une erreur a eu lieu. Merci de réessayer plus tard.', 'toast-error');
      }

      throw new Error(error);
    }

    public handleAuthenticationError() {
      sessionStorage.setItem('redirectUrl', this.router.routerState.snapshot.url);
      this.router.navigate(['auth']);
    }
}
