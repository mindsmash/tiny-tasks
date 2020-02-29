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
        useValue: jasmine.createSpyObj('taskService', ['delete', 'clear', 'changeStatus'])
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
    component.delete({id: 'id', name: 'My task',  status: 'Todo'});

    // then
    expect(taskService.delete).toHaveBeenCalledWith('id');
  });

  it('should emit the task after deletion', () => {
    // given
    taskService.delete.and.returnValue(of(null));
    const deleteEmitter = spyOn(component.deleted, 'emit');

    // when
    component.delete({id: 'id', name: 'My task',  status: 'Todo'});

    // then
    expect(deleteEmitter).toHaveBeenCalledWith({id: 'id', name: 'My task',  status: 'Todo'});
  });

  it('should change status of a task', () => {
    // given
    taskService.changeStatus.and.returnValue(of(null));

    // when
    component.changeStatus({id: 'id', name: 'My task',  status: 'Todo'});

    // then
    expect(taskService.changeStatus).toHaveBeenCalledWith('id', 'Todo');
  });

  it('should clear tasks', () => {
    // given
    taskService.clear.and.returnValue(of(null));

    // when
    taskService.clear();

    // then
    expect(taskService.clear).toHaveBeenCalled();
  });
});
