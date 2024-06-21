import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IndicatorsComponent } from './indicators.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';
import {NavbarService} from "../services/navbar.service";

describe('IndicatorsComponent', () => {
  let component: IndicatorsComponent;
  let fixture: ComponentFixture<IndicatorsComponent>;
  let mockNavbarService;

  beforeEach(waitForAsync(() => {
    const data = of();

    const collectionStub = {
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data)
    };

    const mockAngularFirestore = {
      collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
    };

    mockNavbarService = jasmine.createSpyObj(['handleTabsChoice', 'show']);

    TestBed.configureTestingModule({
      declarations: [IndicatorsComponent],
      providers: [
        { provide: AngularFirestore, useValue: mockAngularFirestore },
        { provide: NavbarService, useValue: mockNavbarService }
      ]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(mockNavbarService.show).toHaveBeenCalled();
    expect(mockNavbarService.handleTabsChoice).toHaveBeenCalled();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
