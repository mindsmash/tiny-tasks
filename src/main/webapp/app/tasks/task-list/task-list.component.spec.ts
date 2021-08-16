import { ComponentFixture, TestBed } from '@angular/core/testing';

import {TaskListComponent} from 'app/tasks/task-list/task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    const taskService = jasmine.createSpyObj('taskService', ['create', 'sortTasks']);

    await TestBed.configureTestingModule({
      declarations: [ TaskListComponent ],
      providers: [{
        provide: 'taskService', taskService
      }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
