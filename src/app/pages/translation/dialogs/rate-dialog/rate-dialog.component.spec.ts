import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogModule, MatDialogRef } from '@angular/material';
import { environment } from 'src/environments/environment';

import { RateDialogComponent } from './rate-dialog.component';

describe('RateDialogComponent', () => {
  let component: RateDialogComponent;
  let fixture: ComponentFixture<RateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        // workaround: why I can't inject MatDialogRef in the unit test?
        {provide: MatDialogRef, useValue: {}},
        AngularFirestore,
      ],
      declarations: [ RateDialogComponent ],
      imports: [     AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
