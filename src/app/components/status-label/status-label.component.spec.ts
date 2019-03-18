import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusLabelComponent } from './status-label.component';

describe('StatusLabelComponent', () => {
  let component: StatusLabelComponent;
  let fixture: ComponentFixture<StatusLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
