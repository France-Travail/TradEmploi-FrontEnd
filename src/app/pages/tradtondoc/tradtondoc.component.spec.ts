import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradtondocComponent } from './tradtondoc.component';

describe('TradtondocComponent', () => {
  let component: TradtondocComponent;
  let fixture: ComponentFixture<TradtondocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradtondocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradtondocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
