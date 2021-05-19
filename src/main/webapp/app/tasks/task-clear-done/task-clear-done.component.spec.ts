import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskClearDoneComponent} from './task-clear-done.component';
import {of} from "rxjs";
import {TaskService} from "app/tasks/task.service";

describe('TaskClearDoneComponent', () => {
  let component: TaskClearDoneComponent;
  let fixture: ComponentFixture<TaskClearDoneComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    taskService = jasmine.createSpyObj('taskService', ['deleteTasks']);
    await TestBed.configureTestingModule({
      declarations: [TaskClearDoneComponent],
      providers: [{
        provide: 'TaskService',
        useValue: taskService
      }]
    }).overrideTemplate(TaskClearDoneComponent, '')
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

  it('should delete all done tasks', () => {
    // given
    taskService.deleteTasks.and.returnValue(of(null));


    // when
    component.tasks = [{id: 'id', name: 'my task', done: true}];
    component.clearDoneTasks();

    // then
    expect(taskService.deleteTasks).toHaveBeenCalled();
  });
});
