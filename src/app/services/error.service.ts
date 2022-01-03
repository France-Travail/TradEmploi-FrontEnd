import { ErrorDetail, ErrorType } from '../models/error/errorType';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {
    private db: string = 'errors';

    constructor(private readonly afs: AngularFirestore, private readonly settingService: SettingsService) {}

    public save(detail: ErrorDetail): Promise<void> {
        const roomId: string = this.settingService.user.value.roomId;
        const date = new Date();
        const day = date.toLocaleDateString('fr-FR');
        const hour = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
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
}
