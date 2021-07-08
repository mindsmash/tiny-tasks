import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {of} from 'rxjs';

import {TaskService} from '../task.service';
import {TaskListComponent} from './task-list.component';
import {TaskStatus} from "app/tasks/task";

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(waitForAsync(() => {
    taskService = jasmine.createSpyObj('taskService', ['delete', 'setStatus']);
    TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      providers: [{
        provide: 'TaskService',
        useValue: taskService
      }]
    }).overrideTemplate(TaskListComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete a task', () => {
    // given
    taskService.delete.and.returnValue(of(null));

    // when
    component.delete({id: 'id', name: 'My task', status: TaskStatus.Todo});

    // then
    expect(taskService.delete).toHaveBeenCalledWith('id');
  });

  it('should emit the task after deletion', () => {
    // given
    taskService.delete.and.returnValue(of(null));
    const deleteEmitter = spyOn(component.deleted, 'emit');

    // when
    component.delete({id: 'id', name: 'My task', status: TaskStatus.Todo});

    // then
    expect(deleteEmitter).toHaveBeenCalledWith({id: 'id', name: 'My task', status: TaskStatus.Todo});
  });

  it('should set new status for a task', () => {
    // given
    taskService.setStatus.and.returnValue(of({id: 'id', name: 'My task', status: TaskStatus.Done}));

    // when
    component.changeStatus('id', TaskStatus.Done);

    // then
    expect(taskService.setStatus).toHaveBeenCalledWith('id',  TaskStatus.Done);
  });

  it('should emit updated task after setting new status', () => {
    // given
    taskService.setStatus.and.returnValue(of({id: 'id', name: 'My task', status: TaskStatus.Done}));
    const changeStatusEmitter = spyOn(component.statusChanged, 'emit');

    // when
    component.changeStatus('id', TaskStatus.Done);

    // then
    expect(changeStatusEmitter).toHaveBeenCalledWith({id: 'id', name: 'My task', status: TaskStatus.Done});
  });

  it('should consider only "canceled" and "done" statuses as finished', () => {
    expect(component.isTaskFinished({id: 'id', name: 'My task', status: TaskStatus.Done})).toBe(true);
    expect(component.isTaskFinished({id: 'id', name: 'My task', status: TaskStatus.Cancelled})).toBe(true);
    expect(component.isTaskFinished({id: 'id', name: 'My task', status: TaskStatus.Todo})).toBe(false);
    expect(component.isTaskFinished({id: 'id', name: 'My task', status: TaskStatus.Blocked})).toBe(false);
    expect(component.isTaskFinished({id: 'id', name: 'My task', status: TaskStatus.InProgress})).toBe(false);
  })
});
