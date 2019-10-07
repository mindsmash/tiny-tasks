import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { of } from 'rxjs';

import { TaskService } from '../task.service';
import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      providers: [{
        provide: 'TaskService',
        useValue: jasmine.createSpyObj('taskService', ['delete', 'update'])
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

  it('should delete a task', () => {
    // given
    taskService.delete.and.returnValue(of(null));

    // when
    component.delete({id: 'id', name: 'My task', isDone: true});

    // then
    expect(taskService.delete).toHaveBeenCalledWith('id');
  });

  it('should emit the task after deletion', () => {
    // given
    taskService.delete.and.returnValue(of(null));
    const deleteEmitter = spyOn(component.deleted, 'emit');

    // when
    component.delete({id: 'id', name: 'My task', isDone: true});

    // then
    expect(deleteEmitter).toHaveBeenCalledWith({id: 'id', name: 'My task', isDone: true});
  });

  it('should update a task', () => {
    // given
    taskService.update.and.returnValue(of(null));

    // when
    component.update({id: 'id', name: 'My task', isDone: true});

    // then
    expect(taskService.update).toHaveBeenCalledWith({id: 'id', name: 'My task', isDone: true});
  });

  it('should set a task as done', () => {
    // given
    taskService.update.and.returnValue(of(null));
    const task = {id: 'id', name: 'My task', isDone: false};

    // when
    component.setDone(task);

    // then
    expect(task.isDone).toBe(true);
  });
});
