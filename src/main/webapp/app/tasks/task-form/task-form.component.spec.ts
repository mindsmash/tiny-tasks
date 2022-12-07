import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';
import { of } from 'rxjs';

import { TaskService } from '../task.service';
import { TaskFormComponent } from './task-form.component';
import {By} from "@angular/platform-browser";

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

  it('should create a task', () => {
    // given
    component.taskForm.setValue({ name: 'My task', duedate: new Date('12/12/12') });
    taskService.create.and.returnValue(of({ id: 'id', name: 'My task', duedate: new Date('12/12/12') }));

    // when
    component.onSubmit();

    // then
    expect(taskService.create).toHaveBeenCalledWith('My task', new Date('12/12/12'));
  });

  it('should not create an empty task', () => {
    // given
    component.taskForm.setValue({ name: '', duedate: null });

    // when
    component.onSubmit();

    // then
    expect(taskService.create).not.toHaveBeenCalled();
  });

  it('should emit the task after creation', () => {
    // given
    component.taskForm.setValue({ name: 'My task', duedate: new Date('12/12/12') });
    taskService.create.and.returnValue(of({ id: 'id', name: 'My task' }));
    const createEmitter = spyOn(component.created, 'emit');

    // when
    component.onSubmit();

    // then
    expect(createEmitter).toHaveBeenCalledWith({ id: 'id', name: 'My task' });
  });

  it('should reset the form after creation', () => {
    // given
    component.taskForm.setValue({ name: 'My task', duedate: new Date('12/12/12') });
    taskService.create.and.returnValue(of({ id: 'id', name: 'My task', duedate: new Date('12/12/12') }));
    const formReset = spyOn(component.taskForm, 'reset');

    // when
    component.onSubmit();

    // then
    expect(formReset).toHaveBeenCalled();
  });

  it('should check if button exists', () => {
    const submitButton = fixture.debugElement.queryAll(By.css('.submit-button'));
    expect(submitButton).toBeTruthy();
  });
});
