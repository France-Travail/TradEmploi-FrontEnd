import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguagesComponent } from './languages.component';
import { MatDialogRef, MatSort, MatPaginator } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
fdescribe('LanguagesComponent', () => {
  let component: LanguagesComponent;
  let fixture: ComponentFixture<LanguagesComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [LanguagesComponent, MatSort, MatPaginator],
      providers: [{ provide: MatDialogRef, useValue: {} }]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
