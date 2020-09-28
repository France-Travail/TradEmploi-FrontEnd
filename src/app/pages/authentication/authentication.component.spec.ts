import { async, ComponentFixture, fakeAsync, inject, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { Location } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { routes } from 'src/app/app-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SettingsService } from 'src/app/services/settings.service';
import { Role } from 'src/app/models/role';


describe('AuthenticationComponent', () => {
    let component: AuthenticationComponent;
    let fixture: ComponentFixture<AuthenticationComponent>;
    let location: Location;
    let router: Router;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthService,
                ToastService,
                AngularFireAuth,
                AngularFirestore
            ],
            declarations: [AuthenticationComponent],
            imports: [AngularFireModule.initializeApp(environment.firebaseConfig),
                AngularFireDatabaseModule, BrowserAnimationsModule, RouterModule, ReactiveFormsModule, MatSnackBarModule, RouterTestingModule.withRoutes(routes)],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        router = TestBed.get(Router);
        location = TestBed.get(Location);
        fixture = TestBed.createComponent(AuthenticationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should form to be defined', () => {
        component.ngOnInit()
        expect(component.form).toBeDefined();
    })

    it('should multiDevise user redirected to choice', inject([SettingsService], (settingsService: SettingsService) => {
        const routerSpy = spyOn(router, 'navigateByUrl');
        settingsService.user.next({ ...settingsService.user.value,roomId : '123456', role: Role.GUEST });
        fixture.detectChanges();
        expect(routerSpy).toHaveBeenCalledWith('choice');
    }));

    it('should oneDevise user redirected to choice', inject([SettingsService], (settingsService: SettingsService) => {
        const routerSpy = spyOn(router, 'navigateByUrl');
        settingsService.user.next({ ...settingsService.user.value, firstname: 'Pôle emploi' });
        fixture.detectChanges();
        expect(routerSpy).toHaveBeenCalledWith('choice');
    }));


    it('should valid email', () => {
        component.form.controls['email'].setValue('Jane@gmail.com');
        const result = component.email;
        expect(result.valid).toBeTruthy();
    });

    it('should reject email', () => {
        component.form.controls['email'].setValue('Janegmail.com');
        const result = component.email;
        expect(result.valid).toBeFalsy();
    });


    it('should valid password', () => {
        component.form.controls['password'].setValue('ABCDEFG');
        const result = component.password;
        expect(result.valid).toBeTruthy();
    });

    it('should reject password', () => {
        component.form.controls['password'].setValue('ABC');
        const result = component.password;
        expect(result.valid).toBeFalsy();
    });


    it('should accept submit', async () => {
        const routerSpy = spyOn(router, 'navigateByUrl');
        let promiseData = { isAuth: true, message: 'Authentification réussie' };
        const toastSpy = spyOn(ToastService.prototype, 'showToast');
        const authSpy = spyOn(AuthService.prototype, 'login').and
            .callFake(function () {
                return Promise.resolve(promiseData);
            });
        await component.onSubmit();
        expect(authSpy).toHaveBeenCalled();
        expect(toastSpy).toHaveBeenCalled();
        expect(routerSpy).toHaveBeenCalledWith('choice');
    });

    it('should reject submit', async () => {
        let promiseData = { isAuth: false, message: 'Authentification échouée' };
        const toastSpy = spyOn(ToastService.prototype, 'showToast').and.callThrough()
        const authSpy = spyOn(AuthService.prototype, 'login').and.callFake(function () {
            return Promise.reject(promiseData);
        });
        await component.onSubmit();
        expect(authSpy).toHaveBeenCalled();
        expect(toastSpy).toHaveBeenCalled();
    });


});