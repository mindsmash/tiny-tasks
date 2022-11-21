import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { TaskService } from '../shared/task.service';
import { TaskCreateFormComponent } from './task-create-form.component';

describe('TaskFormComponent', () => {
  let component: TaskCreateFormComponent;
  let fixture: ComponentFixture<TaskCreateFormComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(waitForAsync(() => {
    taskService = jasmine.createSpyObj('taskService', ['create']);
    TestBed.configureTestingModule({
      declarations: [TaskCreateFormComponent],
      providers: [{
        provide: 'TaskService',
        useValue: taskService
      }]
    }).overrideTemplate(TaskCreateFormComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a task', () => {
    // given
    component.taskForm.setValue({ name: 'My task' });
    taskService.create.and.returnValue(of({ id: 'id', name: 'My task' }));

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
    // given
    component.taskForm.setValue({ name: 'My task' });
    taskService.create.and.returnValue(of({ id: 'id', name: 'My task' }));
    const createEmitter = spyOn(component.created, 'emit');

    // when
    component.onSubmit();

    // then
    expect(createEmitter).toHaveBeenCalledWith({ id: 'id', name: 'My task' });
  });

  it('should reset the form after creation', () => {
    // given
    component.taskForm.setValue({ name: 'My task' });
    taskService.create.and.returnValue(of({ id: 'id', name: 'My task' }));
    const formReset = spyOn(component.taskForm, 'reset');

    // when
    component.onSubmit();

    // then
    expect(formReset).toHaveBeenCalled();
  });
});
