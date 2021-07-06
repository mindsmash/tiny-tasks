import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { TaskService } from '../task.service';
import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(waitForAsync(() => {
    taskService = jasmine.createSpyObj('taskService', ['delete', 'setDoneStatus']);
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

  it('should toggle the done property of a task', () => {
    // given
    taskService.setDoneStatus.and.returnValue(of({id: 'id', name: 'My task', isDone: true}));

    // when
    component.toggleDoneStatus({id: 'id', name: 'My task', isDone: false});

    // then
    expect(taskService.setDoneStatus).toHaveBeenCalledWith({id: 'id', name: 'My task', isDone: true});
  });

  it('should emit the task after changing done property', () => {
    // given
    taskService.setDoneStatus.and.returnValue(of({id: 'id', name: 'My task', isDone: true}));
    const toggleEmitter = spyOn(component.toggledDoneStatus, 'emit');

    // when
    component.toggleDoneStatus({id: 'id', name: 'My task', isDone: false});

    // then
    expect(toggleEmitter).toHaveBeenCalledWith({id: 'id', name: 'My task', isDone: true});
  });
});
