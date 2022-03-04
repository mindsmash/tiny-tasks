import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {of} from 'rxjs';

import {TaskService} from '../task.service';
import {TaskListComponent} from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(waitForAsync(() => {
    taskService = jasmine.createSpyObj('taskService', ['delete', 'markAsDone']);
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
    taskService.delete.and.returnValue(of(void 0));

    // when
    component.delete({id: 'id', name: 'My task'});

    // then
    expect(taskService.delete).toHaveBeenCalledWith('id');
  });

  it('should emit the task after deletion', () => {
    // given
    taskService.delete.and.returnValue(of(void 0));
    const deleteEmitter = spyOn(component.deleted, 'emit');

    // when
    component.delete({id: 'id', name: 'My task'});

    // then
    expect(deleteEmitter).toHaveBeenCalledWith({id: 'id', name: 'My task'});
  });

  it('should mark a task as done', () => {
    // given
    taskService.markAsDone.and.returnValue(of({id: 'id', name: 'My task', isDone: true}));
    const task ={id: 'id', name: 'My task'};

    // when
    component.markAsDone(task);

    // then
    expect(taskService.markAsDone).toHaveBeenCalledWith('id');
  });

  it('should not mark a task as done if it is done yet', () => {
    // given
    const task ={id: 'id', name: 'My task', isDone: true};

    // when
    component.markAsDone(task);

    // then
    expect(taskService.markAsDone).not.toHaveBeenCalled();
  });

  it('should emit the task after marking it as done', () => {
    // given
    taskService.markAsDone.and.returnValue(of({id: 'id', name: 'My task', isDone: true}));
    const doneEmitter = spyOn(component.done, 'emit');

    // when
    component.markAsDone({id: 'id', name: 'My task'});

    // then
    expect(doneEmitter).toHaveBeenCalledWith({id: 'id', name: 'My task', isDone: true});
  });

});
