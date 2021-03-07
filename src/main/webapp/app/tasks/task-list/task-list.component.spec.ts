import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { LocalTaskService } from '../local-task.service';
import { TaskStatus } from '../task';
import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<LocalTaskService>;

  beforeEach(waitForAsync(() => {
    taskService = jasmine.createSpyObj('taskService', ['delete', 'changeStatus', 'deleteAllTasks']);
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
    spyOn(window, "confirm").and.returnValue(true);
    taskService.delete.and.returnValue(of(null));

    // when
    component.delete({id: 'id', name: 'My task'});

    // then
    expect(taskService.delete).toHaveBeenCalledWith('id');
  });

  it('should emit the task after deletion', () => {
    // given
    spyOn(window, "confirm").and.returnValue(true);
    taskService.delete.and.returnValue(of(null));
    const deleteEmitter = spyOn(component.deleted, 'emit');

    // when
    component.delete({id: 'id', name: 'My task'});

    // then
    expect(deleteEmitter).toHaveBeenCalledWith({id: 'id', name: 'My task'});
  });

  it('should change status of a task', () => {
    // given
    taskService.changeStatus.and.returnValue(of(null));
    spyOn(component.statusChanged, 'emit');

    // when
    component.changeStatus({id: 'id', name: 'My task'}, TaskStatus.Done);

    // then
    expect(component.statusChanged.emit).toHaveBeenCalledWith({id: 'id', name: 'My task'});
  });

  it('should delete all tasks', () => {
    // given
    spyOn(window, "confirm").and.returnValue(true);
    taskService.deleteAllTasks.and.returnValue(of(null));
    spyOn(component.deletedAllDoneTasks, 'emit');

    //when
    component.deleteAllDoneTasks();

    //then
    expect(component.deletedAllDoneTasks.emit).toHaveBeenCalled();
    expect(component.doneTasks).toBeUndefined();
  });
});
