import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskClearDoneComponent } from './task-clear-done.component';

describe('TaskClearDoneComponent', () => {
  let component: TaskClearDoneComponent;
  let fixture: ComponentFixture<TaskClearDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskClearDoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskClearDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
