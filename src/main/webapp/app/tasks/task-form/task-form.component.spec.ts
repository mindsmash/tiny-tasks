import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { ICreateTask, Task } from '../task';

import { TaskService } from '../task.service';
import { TaskFormComponent } from './task-form.component';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let taskService: jasmine.SpyObj<TaskService>;
  let mockTaskeValue: ICreateTask;
  let returnMockTaskeValue: Task;

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
    mockTaskeValue = { name: 'My task', date: '' };
    returnMockTaskeValue = { id: 'id', ...mockTaskeValue };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate a task', () => {
    expect(component.taskForm.invalid).toBe(true);
    component.taskForm.setValue(mockTaskeValue);
    expect(component.taskForm.invalid).toBe(false);
  });

  it('should create a task', () => {
    // given
    component.taskForm.setValue(mockTaskeValue);
    taskService.create.and.returnValue(of(returnMockTaskeValue));

    // when
    component.onSubmit();

    // then
    expect(taskService.create).toHaveBeenCalledWith(mockTaskeValue);
  });

  it('should create a task with date', () => {

    mockTaskeValue = {
      ...mockTaskeValue,
      date: new Date().toISOString()
    };

    returnMockTaskeValue = {
      ...returnMockTaskeValue,
      ...mockTaskeValue
    }

    // given
    component.taskForm.setValue(mockTaskeValue);
    taskService.create.and.returnValue(of(returnMockTaskeValue));

    // when
    component.onSubmit();

    // then
    expect(taskService.create).toHaveBeenCalledWith(mockTaskeValue);
  });

  it('should emit the task after creation', () => {
    // given
    component.taskForm.setValue(mockTaskeValue);
    taskService.create.and.returnValue(of(returnMockTaskeValue));
    const createEmitter = spyOn(component.created, 'emit');

    // when
    component.onSubmit();

    // then
    expect(createEmitter).toHaveBeenCalledWith(returnMockTaskeValue);
  });

  it('should reset the form after creation', () => {
    // given
    component.taskForm.setValue(mockTaskeValue);
    taskService.create.and.returnValue(of(returnMockTaskeValue));
    const formReset = spyOn(component.taskForm, 'reset');

    // when
    component.onSubmit();

    // then
    expect(formReset).toHaveBeenCalled();
  });
});
