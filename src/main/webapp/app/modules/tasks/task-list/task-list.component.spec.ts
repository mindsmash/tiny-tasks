import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AuthService, StorageService, TaskService } from 'app/services';
import { of } from 'rxjs';

import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(waitForAsync(() => {
    taskService = jasmine.createSpyObj('taskService', ['create', 'delete', 'getAll']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TaskListComponent],
      providers: [
        {
          provide: 'TaskService',
          useValue: {...taskService, reloadTasks$: of([])}
        },
        AuthService,
        StorageService,
      ]
    }).overrideTemplate(TaskListComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    //taskService.getAll.calls.reset();
  });

  afterEach(() => {
    taskService.getAll.calls.reset();
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete a task', () => {
    // given
    taskService.delete.and.returnValue(of(null));

    // when
    component.delete({id: 'id', name: 'My task', creator: 'creatorId'});

    // then
    expect(taskService.delete).toHaveBeenCalledWith('id');
  });

  it('should init the tasks', () => {
    // given
    const tasks$ = of([]);
    taskService.getAll.and.returnValue(tasks$);

    // when
    component.ngOnInit();

    // then
    expect(component.tasks$).toEqual(tasks$);
  });

  it('should reload the tasks after task deletion', () => {
    // given
    const tasks$ = of([]);
    taskService.getAll.and.returnValue(tasks$);
    taskService.delete.and.returnValue(of(null));

    // when
    component.delete({id: 'id', name: 'My task', creator: 'creatorId'});

    // then
    expect(component.tasks$).toEqual(tasks$);
    expect(taskService.getAll).toHaveBeenCalledTimes(3);
  });
});
