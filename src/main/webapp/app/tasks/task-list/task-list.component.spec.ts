import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { TaskService } from '../task.service';
import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(waitForAsync(() => {
    taskService = jasmine.createSpyObj('taskService', ['delete', 'toggleDone', 'clearDoneTasks']);
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
    component.delete({id: 'id', name: 'My task', isDone: false});

    // then
    expect(taskService.delete).toHaveBeenCalledWith('id');
  });

  it('should emit the task after deletion', () => {
    // given
    taskService.delete.and.returnValue(of(null));
    const deleteEmitter = spyOn(component.deleted, 'emit');

    // when
    component.delete({id: 'id', name: 'My task', isDone: false});

    // then
    expect(deleteEmitter).toHaveBeenCalledWith({id: 'id', name: 'My task', isDone: false});
  });

  it('should mark a task as done', () => {
    // given
    taskService.toggleDone.and.returnValue(of(null));

    // when
    component.toggleDone({id: 'id', name: 'My task', isDone: true});

    // then
    expect(taskService.toggleDone).toHaveBeenCalledWith('id');
  });

  it('should emit toggledDone event once toggleDone is called', () => {
    // given
    taskService.toggleDone.and.returnValue(of(null));
    const toggleDoneEmitter = spyOn(component.toggledDone, 'emit');

    // when
    component.toggleDone({id: 'id', name: 'My task', isDone: false});

    // then
    expect(toggleDoneEmitter).toHaveBeenCalledWith({id: 'id', name: 'My task', isDone: false});
  });

  it('should clear the list of done tasks', () => {
    // given
    taskService.clearDoneTasks.and.returnValue(of(null));

    // when
    component.clearDoneTasks();

    // then
    expect(taskService.clearDoneTasks).toHaveBeenCalledWith();
  });

  it('should emit clearedDoneTasks event once done tasks are cleared', () => {
    // given
    taskService.clearDoneTasks.and.returnValue(of(null));
    const clearDoneTasksEmitter = spyOn(component.clearedDoneTasks, 'emit');

    // when
    component.clearDoneTasks();

    // then
    expect(clearDoneTasksEmitter).toHaveBeenCalledWith();
  });

});
