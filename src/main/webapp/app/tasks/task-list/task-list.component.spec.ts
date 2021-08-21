import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { TaskService } from '../task.service';
import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(waitForAsync(() => {
    taskService = jasmine.createSpyObj('taskService', ['delete', 'setDone', 'emptyDoneList']);
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
    component.delete({id: 'id', name: 'My task'});

    // then
    expect(taskService.delete).toHaveBeenCalledWith('id');
  });

  it('should emit the task after deletion', () => {
    // given
    taskService.delete.and.returnValue(of(null));
    const deleteEmitter = spyOn(component.deleted, 'emit');

    // when
    component.delete({id: 'id', name: 'My task'});

    // then
    expect(deleteEmitter).toHaveBeenCalledWith({id: 'id', name: 'My task'});
  });

  it('should change done status of a task', () => {
    // given
    taskService.setDone.and.returnValue(of(null));

    // when
    component.setDone({id: 'id', name: 'My task'});

    // then
    expect(taskService.setDone).toHaveBeenCalledWith('id');
  });

  it('should emit the task after done is triggered', () => {
    // given
    taskService.setDone.and.returnValue(of(null));
    const doneEmitter = spyOn(component.done, 'emit');

    // when
    component.setDone({id: 'id', name: 'My task'});

    // then
    expect(doneEmitter).toHaveBeenCalledWith({id: 'id', name: 'My task'});
  });

  it('should empty the list of tasks with status done true', () => {
    // given
    taskService.emptyDoneList.and.returnValue(of(null));

    // when
    component.emptyDoneList();

    // then
    expect(taskService.emptyDoneList).toHaveBeenCalled();
  });

  it('should emit the emptyDone event after deletion of done tasks', () => {
    // given
    taskService.emptyDoneList.and.returnValue(of(null));
    const emptyDoneEmitter = spyOn(component.emptyDone, 'emit');

    // when
    component.emptyDoneList();

    // then
    expect(emptyDoneEmitter).toHaveBeenCalled();
  });
});
