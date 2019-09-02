import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskRootComponent } from './task-root.component';

describe('TaskRootComponent', () => {
  let component: TaskRootComponent;
  let fixture: ComponentFixture<TaskRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
