import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalitesComponent } from './modalites.component';

describe('ModalitesComponent', () => {
  let component: ModalitesComponent;
  let fixture: ComponentFixture<ModalitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalitesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
