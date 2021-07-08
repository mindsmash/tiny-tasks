import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { TaskService } from './tasks/task.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(waitForAsync(() => {
    taskService = jasmine.createSpyObj('TaskService', ['getAll']);
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{
        provide: 'TaskService',
        useValue: taskService
      }]
    }).overrideTemplate(AppComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', waitForAsync(() => {
    expect(component).toBeTruthy();
  }));

  it('should init the tasks', () => {
    // given
    const tasks$ = of([]);
    taskService.getAll.and.returnValue(tasks$);

    // when
    component.ngOnInit();

    // then
    expect(component.tasks$).toEqual(tasks$);
  });

  it('should reload the tasks after task creation', () => {
    // given
    const tasks$ = of([]);
    taskService.getAll.and.returnValue(tasks$);

    // when
    component.created();

    // then
    expect(component.tasks$).toEqual(tasks$);
    expect(taskService.getAll).toHaveBeenCalled();
  });

  it('should reload the tasks after task deletion', () => {
    // given
    const tasks$ = of([]);
    taskService.getAll.and.returnValue(tasks$);

    // when
    component.deleted();

    // then
    expect(component.tasks$).toEqual(tasks$);
    expect(taskService.getAll).toHaveBeenCalled();
  });

  it('should reload the tasks after finished tasks were cleared', () => {
    // given
    const tasks$ = of([]);
    taskService.getAll.and.returnValue(tasks$);

    // when
    component.clearFinishedTasks();

    // then
    expect(component.tasks$).toEqual(tasks$);
    expect(taskService.getAll).toHaveBeenCalled();
  });

  it('should reload the tasks after status was changed', () => {
    // given
    const tasks$ = of([]);
    taskService.getAll.and.returnValue(tasks$);

    // when
    component.statusChanged();

    // then
    expect(component.tasks$).toEqual(tasks$);
    expect(taskService.getAll).toHaveBeenCalled();
  });
});
