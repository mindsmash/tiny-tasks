import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { TaskService } from '../task.service';
import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(waitForAsync(() => {
    taskService = jasmine.createSpyObj('taskService', ['delete', 'update', 'clearCompletedTasks']);
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
    component.delete({id: 'id', name: 'My task', isCompleted: false});

    // then
    expect(taskService.delete).toHaveBeenCalledWith('id');
  });

  it('should emit the task after deletion', () => {
    // given
    taskService.delete.and.returnValue(of(null));
    const deleteEmitter = spyOn(component.deleted, 'emit');

    // when
    component.delete({id: 'id', name: 'My task', isCompleted: false});

    // then
    expect(deleteEmitter).toHaveBeenCalledWith({id: 'id', name: 'My task', isCompleted: false});
  });

  it('should update the task', () => {
    taskService.update.and.returnValue(of(null));

    component.update({id: 'id', name: 'My task', isCompleted: true});

    expect(taskService.update).toHaveBeenCalled();
  });

  it('should sort task', () => {
    const data = [
      {id: 'db1c4afe-d358-4b14-acfd-0953e882a6b6', name: 'My task', isCompleted: false},
      {id: 'db1c4afe-d358-4b14-acfd-0953e882a6b6', name: 'My task', isCompleted: true},
      {id: 'db1c4afe-d358-4b14-acfd-0953e882a6b6', name: 'My task', isCompleted: false}
    ];

    const dataSorted = [
      {id: 'db1c4afe-d358-4b14-acfd-0953e882a6b6', name: 'My task', isCompleted: false},
      {id: 'db1c4afe-d358-4b14-acfd-0953e882a6b6', name: 'My task', isCompleted: false},
      {id: 'db1c4afe-d358-4b14-acfd-0953e882a6b6', name: 'My task', isCompleted: true},
    ];

    // when
    component.sortPendingTasks(data);

    // then
    expect(data).toEqual(dataSorted);
  });
});
