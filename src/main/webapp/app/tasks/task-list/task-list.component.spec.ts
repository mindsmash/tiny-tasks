import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { TaskStatus } from '../task';

import { TaskService } from '../task.service';
import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  const task = {
    id: 'id1',
    name: 'complete the challenge',
    status: TaskStatus.New
  }

  beforeEach(waitForAsync(() => {
    taskService = jasmine.createSpyObj('taskService', ['delete', 'updateStatus', 'clearDoneTasks']);
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
    component.delete({id: 'id', name: 'My task', status: TaskStatus.Done});

    // then
    expect(taskService.delete).toHaveBeenCalledWith('id');
  });

  it('should emit the task after deletion', () => {
    // given
    taskService.delete.and.returnValue(of(null));
    const deleteEmitter = spyOn(component.deleted, 'emit');

    // when
    component.delete({id: 'id', name: 'My task', status: TaskStatus.Done});

    // then
    expect(deleteEmitter).toHaveBeenCalledWith({id: 'id', name: 'My task', status: TaskStatus.Done});
  });

  it('should change the task status to done', () => {
    // given
    taskService.updateStatus.and.returnValue(of(task));

    // when
    component.changeStatus(task, TaskStatus.Done);

    // then
    expect(taskService.updateStatus).toHaveBeenCalledWith('id1', TaskStatus.Done);
  });

  it('should emit change-status after status has been changed', () => {
    // given
    taskService.updateStatus.and.returnValue(of(task));
    const changeStatusEmitter = spyOn(component.statusChanged, 'emit');

    // when
    component.changeStatus(task, TaskStatus.Done);

    // then
    expect(changeStatusEmitter).toHaveBeenCalledWith(task);
  });
});
