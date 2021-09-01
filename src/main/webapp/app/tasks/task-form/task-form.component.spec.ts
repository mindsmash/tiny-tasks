import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { Task } from '../task';

import { TaskService } from '../task.service';
import { TaskFormComponent } from './task-form.component';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(waitForAsync(() => {
    taskService = jasmine.createSpyObj('taskService', ['create']);
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

  it('should validate a task', () => {
    expect(component.taskForm.invalid).toBe(true);
    component.taskForm.setValue({name: 'My task', dueDate: null} as Task);
    expect(component.taskForm.invalid).toBe(false);
  });

  it('should create a task', () => {
    // given
    component.taskForm.setValue({name: 'My task', dueDate: null});
    taskService.create.and.returnValue(of({id: 'id', name: 'My task', dueDate: null} as Task));

    // when
    component.onSubmit();

    // then
    expect(taskService.create).toHaveBeenCalledWith('My task', null);
  });

  it('should create a task with dueDate param', () => {

    // given
    component.taskForm.setValue({name: 'My task', dueDate: '2021-09-23T07:41:24.000Z'});
    taskService.create.and.returnValue(of({id: 'id', name: 'My task', dueDate: '2021-09-23T07:41:24.000Z'}));

    // when
    component.onSubmit();

    // then
    expect(taskService.create).toHaveBeenCalledWith('My task', '2021-09-23T07:41:24.000Z');
  });

  it('should emit the task after creation', () => {
    // given
    component.taskForm.setValue({name: 'My task', dueDate: null});
    taskService.create.and.returnValue(of({id: 'id', name: 'My task', dueDate: null} as Task));
    const createEmitter = spyOn(component.created, 'emit');

    // when
    component.onSubmit();

    // then
    expect(createEmitter).toHaveBeenCalledWith({id: 'id', name: 'My task', dueDate: null});
  });

  it('should reset the form after creation', () => {
    // given
    component.taskForm.setValue({name: 'My task', dueDate: null});
    taskService.create.and.returnValue(of({id: 'id', name: 'My task', dueDate: null} as Task));
    const formReset = spyOn(component.taskForm, 'reset');

    // when
    component.onSubmit();

    // then
    expect(formReset).toHaveBeenCalled();
  });
});
