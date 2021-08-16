import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { TaskService } from '../task.service';
import { TaskFormComponent } from './task-form.component';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(waitForAsync(() => {
    taskService = jasmine.createSpyObj('taskService', ['create', 'sortTasks']);
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
    component.taskForm.setValue({name: 'My task', status: 'uncompleted'});
    expect(component.taskForm.invalid).toBe(false);
  });

  it('should create a task', () => {
    // given
    component.taskForm.setValue({name: 'My task', status: 'uncompleted'});
    taskService.create.and.returnValue(of({id: 'id', name: 'My task', status: 'uncompleted'}));

    // when
    component.onSubmit();

    // then
    expect(taskService.create).toHaveBeenCalledWith('My task', 'uncompleted');
  });

  it('should reset the form after creation', () => {
    // given
    component.taskForm.setValue({name: 'My task', status: 'uncompleted'});
    taskService.create.and.returnValue(of({id: 'id', name: 'My task', status: 'uncompleted'}));
    const formReset = spyOn(component.taskForm, 'reset');

    component.onSubmit();
    expect(formReset).toHaveBeenCalled();
    expect(taskService.sortTasks).toHaveBeenCalled();
  });
});
