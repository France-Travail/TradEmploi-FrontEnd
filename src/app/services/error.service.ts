import { ErrorDetail, ErrorPe } from '../models/error/errorPe';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {
    private db: string = 'errors';

    constructor(private afs: AngularFirestore, private settingService: SettingsService) {}

    public saveError(detail: ErrorDetail): Promise<void> {
        const roomId: string = this.settingService.user.value.roomId
        const date = new Date()
        const day = date.toLocaleDateString('fr-FR')
        const hour = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
        const error: ErrorPe = {
            roomId: roomId,
            day: day,
            hour: hour,
            detail: detail
        }
        return this.afs
        .collection(this.db)
        .doc<ErrorPe>(this.afs.createId())
        .set(error);
    }
}
