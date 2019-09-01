import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {of} from 'rxjs';

import {TaskService} from '../task.service';
import {TaskFormComponent} from './task-form.component';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskFormComponent],
      providers: [{
        provide: 'TaskService',
        useValue: jasmine.createSpyObj('taskService', ['create'])
      }]
    }).overrideTemplate(TaskFormComponent, '')
      .compileComponents();

    taskService = TestBed.get('TaskService');
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
    component.taskForm.setValue({name: 'My task', dueDate: new Date(), time: '13:45'});
    expect(component.taskForm.invalid).toBe(false);
  });

  it('should create a task', () => {
    const dueDate = new Date();
    // given
    component.taskForm.setValue({name: 'My task', dueDate: dueDate, time: '13:45'});
    taskService.create.and.returnValue(of({id: 'id', name: 'My task', dueDate: dueDate}));

    // when
    component.onSubmit();

    // then
    expect(taskService.create).toHaveBeenCalledWith('My task', dueDate);
  });

  it('should emit the task after creation', () => {
    const dueDate = new Date();
    // given
    component.taskForm.setValue({name: 'My task', dueDate: dueDate, time: '13:45'});
    taskService.create.and.returnValue(of({id: 'id', name: 'My task', dueDate: dueDate}));
    const createEmitter = spyOn(component.created, 'emit');

    // when
    component.onSubmit();

    // then
    expect(createEmitter).toHaveBeenCalledWith({id: 'id', name: 'My task', dueDate: dueDate});
  });

  it('should reset the form after creation', () => {
    const dueDate = new Date();
    // given
    component.taskForm.setValue({name: 'My task', dueDate: dueDate, time: '13:45'});
    taskService.create.and.returnValue(of({id: 'id', name: 'My task', dueDate: dueDate}));
    const formReset = spyOn(component.taskForm, 'reset');

    // when
    component.onSubmit();

    // then
    expect(formReset).toHaveBeenCalled();
  });
});
