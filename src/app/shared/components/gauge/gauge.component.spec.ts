import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaugeComponent } from './gauge.component';

import 'zone.js/dist/zone-testing';

describe('GaugeComponent', () => {
  let component: GaugeComponent;
  let fixture: ComponentFixture<GaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GaugeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaugeComponent);
    component = fixture.componentInstance;
    component.duration = 5;
    component.user = 'advisor';
    fixture.detectChanges();
  });

  it('text property should equal to Parlez maintenant', async () => {
    expect(component.text).toEqual('Parlez maintenant');
  });

  it('should display Parlez maintenant in HTML', async () => {
    expect(fixture.nativeElement.querySelector('p').textContent).toEqual('Parlez maintenant');
  });
});
