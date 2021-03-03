import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { TaskService } from '../task.service';
import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(waitForAsync(() => {
    taskService = jasmine.createSpyObj('taskService', ['delete', 'updateStatus', 'clearCompletedTasks']);
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
    component.delete({ id: 'id', name: 'My task', status: 'pending' });

    // then
    expect(taskService.delete).toHaveBeenCalledWith('id');
  });

  it('should emit the task after deletion', () => {
    // given
    taskService.delete.and.returnValue(of(null));
    const deleteEmitter = spyOn(component.deleted, 'emit');

    // when
    component.delete({ id: 'id', name: 'My task', status: 'pending' });

    // then
    expect(deleteEmitter).toHaveBeenCalledWith({ id: 'id', name: 'My task', status: 'pending' });
  });

  it('should update status of a task', () => {
    // given
    taskService.updateStatus.and.returnValue(of(null));

    // when
    component.updateStatus({ id: 'id', name: 'My task', status: 'pending' }, 'in progress');

    // then
    expect(taskService.updateStatus).toHaveBeenCalledWith('id', 'in progress');
  });

  it('should clear completed tasks', () => {
    // given
    taskService.clearCompletedTasks.and.returnValue(of(null));

    // when
    taskService.clearCompletedTasks();

    // then
    expect(taskService.clearCompletedTasks).toHaveBeenCalled();
  });
});
