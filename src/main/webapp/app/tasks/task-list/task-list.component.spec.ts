import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {of} from 'rxjs';

import {TaskService} from '../task.service';
import {TaskListComponent} from './task-list.component';
import {Task} from "app/tasks/task";

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      providers: [{
        provide: 'TaskService',
        useValue: jasmine.createSpyObj('taskService', ['delete', 'markAsDone', 'deleteAllDone'])
      }]
    }).overrideTemplate(TaskListComponent, '')
      .compileComponents();

    taskService = TestBed.get('TaskService');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Delete', () => {
    it('should delete a task', () => {
      // given
      taskService.delete.and.returnValue(of(null));

      // when
      component.delete({id: 'id', name: 'My task'} as Task);

      // then
      expect(taskService.delete).toHaveBeenCalledWith('id');
    });

    it('should emit the task after deletion', () => {
      // given
      taskService.delete.and.returnValue(of(null));
      const deleteEmitter = spyOn(component.deleted, 'emit');

      // when
      component.delete({id: 'id', name: 'My task'} as Task);

      // then
      expect(deleteEmitter).toHaveBeenCalledWith({id: 'id', name: 'My task'});
    });
  });

  describe('Mark as done', () => {
    it('should mark the task as done', () => {
      // given
      taskService.markAsDone.and.returnValue(of(null));

      // when
      component.markAsDone({id: '123'} as Task);

      // then
      expect(taskService.markAsDone).toHaveBeenCalledWith('123');
    });

    it('should emit an event after marks as done', () => {
      // given
      taskService.markAsDone.and.returnValue(of(null));
      const emitter = spyOn(component.markedDone, 'emit');

      // when
      component.markAsDone({id: '123'} as Task);

      // then
      expect(emitter).toHaveBeenCalledWith('123');
    });
  });

  describe('Delete all done', () => {
    it('should delete all done tasks', () => {
      // given
      taskService.deleteAllDone.and.returnValue(of(null));

      // when
      component.deleteAllDone();

      // then
      expect(taskService.deleteAllDone).toHaveBeenCalled();
    });

    it('should emit an event after delete all done', () => {
      // given
      taskService.deleteAllDone.and.returnValue(of(null));
      const emitter = spyOn(component.deletedDone, 'emit');

      // when
      component.deleteAllDone();

      // then
      expect(emitter).toHaveBeenCalled();
    });
  });

});
