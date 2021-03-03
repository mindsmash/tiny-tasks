import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AuthService, StorageService } from 'app/services';
import { Subject, of } from 'rxjs';

import { TaskService } from '../../../services/task/task.service';
import { TaskFormComponent } from './task-form.component';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let taskService: jasmine.SpyObj<TaskService>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(waitForAsync(() => {
    taskService = jasmine.createSpyObj('taskService', ['create'], ['reloadTasks$']);
    authService = jasmine.createSpyObj('authService', [
      'hasValidToken',
      'getToken',
      'getTokenValue',
      'tokenExists',
      'isTokenExpired',
      'login',
      'logout',
    ]);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TaskFormComponent],
      providers: [
        {
          provide: 'TaskService',
          useValue: {...taskService, reloadTasks$: new Subject()},
        },
        {
          provide: 'AuthService',
          useValue: {},
        },
        StorageService,
      ]
    }).overrideTemplate(TaskFormComponent, '')
      .overrideProvider(AuthService, {useValue: authService})
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
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
    taskService.create.and.returnValue(of({id: 'id', name: 'My task', creator: 'creatorId'}));
    authService.hasValidToken.and.returnValue(true);
    authService.getTokenValue.and.returnValue('creatorId');

    // when
    component.onSubmit();

    // then
    expect(taskService.create).toHaveBeenCalledWith('My task', 'creatorId');
  });

  it('should reset the form after creation', () => {
    // given
    component.taskForm.setValue({name: 'My task'});
    taskService.create.and.returnValue(of({id: 'id', name: 'My task', creator: 'creatorId'}));
    authService.hasValidToken.and.returnValue(true);
    authService.getTokenValue.and.returnValue('creatorId');
    const formReset = spyOn(component.taskForm, 'reset');

    // when
    component.onSubmit();

    // then
    expect(formReset).toHaveBeenCalled();
  });
});
