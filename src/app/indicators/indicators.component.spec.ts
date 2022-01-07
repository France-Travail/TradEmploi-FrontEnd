import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IndicatorsComponent } from './indicators.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';

describe('IndicatorsComponent', () => {
  let component: IndicatorsComponent;
  let fixture: ComponentFixture<IndicatorsComponent>;

  beforeEach(waitForAsync(() => {
    const data = of();

    const collectionStub = {
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data)
    };

    const mockAngularFirestore = {
      collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
    };


    TestBed.configureTestingModule({
      declarations: [IndicatorsComponent],
      providers: [
        { provide: AngularFirestore, useValue: mockAngularFirestore }
      ]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
