import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiledialogComponent } from './filedialog.component';

describe('FiledialogComponent', () => {
  let component: FiledialogComponent;
  let fixture: ComponentFixture<FiledialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiledialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiledialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
