import { Task } from './../task';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { TaskService } from '../task.service';
import { TaskFormComponent } from './task-form.component';
import { TaskStore } from '../task.store';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let taskService: jasmine.SpyObj<TaskService>;
  let taskStore: jasmine.SpyObj<TaskStore>;
  const task: Task = { id: 'id', name: 'My task', status: 'New' };

  beforeEach(waitForAsync(() => {
    taskService = jasmine.createSpyObj('taskService', {
      'create': of(task),
      'getAll': of([])});
    taskStore = jasmine.createSpyObj('taskStore', ['delete', 'loadTasks']);
    TestBed.configureTestingModule({
      declarations: [TaskFormComponent],
      providers: [{
        provide: 'TaskService',
        useValue: taskService
      }]
    }).overrideTemplate(TaskFormComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a task', () => {
    // given
    component.taskForm.setValue({ name: 'My task' });
    taskService.create.and.returnValue(of(task));

    // when
    component.onSubmit();

    // then
    expect(taskService.create).toHaveBeenCalledWith('My task');
  });

  it('should not create an empty task', () => {
    // given
    component.taskForm.setValue({ name: '' });

    // when
    component.onSubmit();

    // then
    expect(taskService.create).not.toHaveBeenCalled();
  });

  it('should emit the task after creation', () => {
    fakeAsync(() => {
      // given
      component.taskForm.setValue({ name: 'My task' });
      taskService.create.and.returnValue(of(task));

      // when
      component.onSubmit();
      tick(200);
      
      // then
      expect(taskStore.delete).toHaveBeenCalledWith('id');
    })
  });

  it('should reset the form after creation', () => {
    // given
    component.taskForm.setValue({ name: 'My task' });
    taskService.create.and.returnValue(of(task));
    const formReset = spyOn(component.taskForm, 'reset');

    // when
    component.onSubmit();

    // then
    expect(formReset).toHaveBeenCalled();
  });
});
