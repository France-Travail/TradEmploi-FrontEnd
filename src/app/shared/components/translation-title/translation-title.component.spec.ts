import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationTitleComponent } from './translation-title.component';

describe('TranslationTitleComponent', () => {
  let component: TranslationTitleComponent;
  let fixture: ComponentFixture<TranslationTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslationTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
