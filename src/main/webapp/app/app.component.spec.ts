import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { TaskService } from './tasks/task.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{
        provide: 'TaskService',
        useValue: jasmine.createSpyObj('TaskService', ['getTasksNotDone', 'getTasksDone'])
      }]
    }).overrideTemplate(AppComponent, '')
      .compileComponents();

    taskService = TestBed.get('TaskService');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should init the date timer', () => {
    component.now$.subscribe(date => expect(date instanceof Date).toBe(true));
    component.ngOnInit();
  });

  it('should init the tasks', () => {
    // given
    const tasksNotDone$ = of([]);
    const tasksDone$ = of([]);
    taskService.getTasksNotDone.and.returnValue(tasksNotDone$);
    taskService.getTasksDone.and.returnValue(tasksDone$);

    // when
    component.ngOnInit();

    // then
    expect(component.tasksNotDone$).toEqual(tasksNotDone$);
    expect(component.tasksDone$).toEqual(tasksDone$);
  });

  it('should reload the tasks after retrieving tasks from taskService', () => {
    // given
    const tasksNotDone$ = of([]);
    const tasksDone$ = of([]);
    taskService.getTasksNotDone.and.returnValue(tasksNotDone$);
    taskService.getTasksDone.and.returnValue(tasksDone$);

    // when
    component.getTasks();

    // then
    expect(component.tasksNotDone$).toEqual(tasksNotDone$);
    expect(component.tasksDone$).toEqual(tasksDone$);
    expect(taskService.getTasksNotDone).toHaveBeenCalled();
    expect(taskService.getTasksDone).toHaveBeenCalled();
  });
});
