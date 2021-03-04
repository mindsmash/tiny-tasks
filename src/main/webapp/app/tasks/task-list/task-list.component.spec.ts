import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { TaskService } from '../task.service';
import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(waitForAsync(() => {
    taskService = jasmine.createSpyObj('taskService', ['delete', 'setIsDone', 'deleteAllDoneTasks']);
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
    component.delete({ id: 'id', name: 'My task', done: false });

    // then
    expect(taskService.delete).toHaveBeenCalledWith('id');
  });

  it('should emit the task after deletion', () => {
    // given
    taskService.delete.and.returnValue(of(null));
    const deleteEmitter = spyOn(component.deleted, 'emit');

    // when
    component.delete({ id: 'id', name: 'My task', done: false });

    // then
    expect(deleteEmitter).toHaveBeenCalledWith({ id: 'id', name: 'My task', done: false });
  });

  it('should emit the task after done status changed', () => {
    // given
    taskService.setIsDone.and.returnValue(of(null));
    const taskDoneStatusChangedEmitter = spyOn(component.doneStatusChanged, 'emit');
    // when
    component.toggleDone(true, { id: 'id', name: 'My task', done: false });

    // then
    expect(taskDoneStatusChangedEmitter).toHaveBeenCalledWith({ id: 'id', name: 'My task', done: true });

    // when
    component.toggleDone(false, { id: 'id', name: 'My task', done: true });

    // then
    expect(taskDoneStatusChangedEmitter).toHaveBeenCalledWith({ id: 'id', name: 'My task', done: false });
  });

  it('should delete all done tasks', () => {
    // given
    taskService.deleteAllDoneTasks.and.returnValue(of(null));

    // when
    component.deleteAllDoneTasks();

    // then
    expect(taskService.deleteAllDoneTasks).toHaveBeenCalled();
  });
});
