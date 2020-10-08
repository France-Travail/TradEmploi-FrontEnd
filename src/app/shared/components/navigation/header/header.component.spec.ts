import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HeaderComponent } from './header.component';
import { ComponentType, OVERLAY_PROVIDERS } from '@angular/cdk/overlay';
import { NavbarService } from '../../../../services/navbar.service';
import { ShareComponent } from 'src/app/pages/translation/dialogs/share/share.component';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MatDialogModule],
            declarations: [HeaderComponent],
            providers: [
                MatDialog,
                NavbarService,
                OVERLAY_PROVIDERS,
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        const choiceLink: string = 'langues';
        const logoutLink: string = 'deconnexion';
        const isGuest: boolean = false;
        const isAdmin: boolean = false;
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    xit('should toggle nav bar', () => {
        expect(component).toBeTruthy();
    });

    xit('should open share-conversation modal' , () => {
        let dialog: MatDialog;
        const dialogSpy = spyOn(MatDialog.prototype, 'open').and
        .callFake(function(ShareComponent , height) {
           return dialog.open(ShareComponent, {
                width: '800px',
                height : '500px',
                panelClass: 'customDialog'
              });
        });
        component.share();
        expect(dialogSpy).toHaveBeenCalled();

    });



});
