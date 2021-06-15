import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { TaskService } from '../task.service';
import { TaskFormComponent } from './task-form.component';
describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let taskService: jasmine.SpyObj<TaskService>;
  let task;

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
    task = {id: 'id', name: 'My task', files : []};
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate a task', () => {
    expect(component.taskForm.invalid).toBe(true);
    component.taskForm.setValue({name: 'My task'});
    expect(component.taskForm.invalid).toBe(false);
  });

  it('should create a task', () => {
    // given
    component.taskForm.setValue({name: 'My task'});
    taskService.create.and.returnValue(of());

    // when
    component.onSubmit();

    // then
    expect(taskService.create).toHaveBeenCalledWith('My task');
  });

  it('should emit the task after creation', () => {
    // given
    component.taskForm.setValue({name: 'My task'});
    taskService.create.and.returnValue(of(task));
    const createEmitter = spyOn(component.created, 'emit');

    // when
    component.onSubmit();

    // then
    expect(createEmitter).toHaveBeenCalledWith(task);
  });

  it('should reset the form after creation', () => {
    // given
    component.taskForm.setValue({name: 'My task'});
    taskService.create.and.returnValue(of(task));
    const formReset = spyOn(component.taskForm, 'reset');

    // when
    component.onSubmit();

    // then
    expect(formReset).toHaveBeenCalled();
  });
});
