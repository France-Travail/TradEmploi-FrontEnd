import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageWrapperComponent } from './message-wrapper.component';

xdescribe('MessageWrapperComponent', () => {
  let component: MessageWrapperComponent;
  let fixture: ComponentFixture<MessageWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
