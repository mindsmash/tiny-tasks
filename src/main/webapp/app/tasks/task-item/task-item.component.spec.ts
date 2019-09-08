import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { of } from 'rxjs';

import { TaskService } from '../task.service';
import { TaskItemComponent } from './task-item.component';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskItemComponent],
      providers: [{
        provide: 'TaskService',
        useValue: jasmine.createSpyObj('taskService', ['create'])
      }]
    }).overrideTemplate(TaskItemComponent, '')
      .compileComponents();

    taskService = TestBed.get('TaskService');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate a task', () => {
    expect(component.taskUpdateForm.invalid).toBe(true);
    component.taskUpdateForm.setValue({name: 'My task'});
    expect(component.taskUpdateForm.invalid).toBe(false);
  });

  it('should create a task', () => {
    // given
    component.taskUpdateForm.setValue({name: 'My task'});
    taskService.create.and.returnValue(of({id: 'id', name: 'My task', status: 'PENDING'}));

    // when
    component.onSubmit();

    // then
    expect(taskService.create).toHaveBeenCalledWith('My task');
  });

  it('should emit the task after creation', () => {
    // given
    component.taskUpdateForm.setValue({name: 'My task'});
    taskService.create.and.returnValue(of({id: 'id', name: 'My task', status: 'PENDING'}));
    const createEmitter = spyOn(component.created, 'emit');

    // when
    component.onSubmit();

    // then
    expect(createEmitter).toHaveBeenCalledWith({id: 'id', name: 'My task'});
  });

  it('should reset the form after creation', () => {
    // given
    component.taskUpdateForm.setValue({name: 'My task'});
    taskService.create.and.returnValue(of({id: 'id', name: 'My task', status: 'PENDING'}));
    const formReset = spyOn(component.taskUpdateForm, 'reset');

    // when
    component.onSubmit();

    // then
    expect(formReset).toHaveBeenCalled();
  });
});
