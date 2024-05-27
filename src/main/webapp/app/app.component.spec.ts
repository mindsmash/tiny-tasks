import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { Task } from './tasks/task';
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

  it('should init the tasks',  fakeAsync(() => {
    // given
    const tasks = ['test1', 'test2'] as any as Task[];
    const tasks$ = of(tasks);
    taskService.getAll.and.returnValue(tasks$);

    // when
    component.ngOnInit();
    tick();
    // then
    component.tasks$.subscribe(t => {
      expect(t).toEqual(tasks);
      expect(taskService.getAll).toHaveBeenCalled();
    });
  }));

  it('should reload the tasks after task creation',  fakeAsync(() => {
    // given
    const tasks = ['test1', 'test2'] as any as Task[];
    const tasks$ = of(tasks);
    taskService.getAll.and.returnValue(tasks$);

    // when
    component.created();
    tick();
    // then
    component.tasks$.subscribe(t => {
      expect(t).toEqual(tasks);
      expect(taskService.getAll).toHaveBeenCalled();
    });
  }));

  it('should reload the tasks after task deletion', fakeAsync(() => {
    // given
    const tasks = ['test1', 'test2'] as any as Task[];
    const tasks$ = of(tasks);
    taskService.getAll.and.returnValue(tasks$);

    // when
    component.deleted();
    tick();
    // then
    component.tasks$.subscribe(t => {
      expect(t).toEqual(tasks);
      expect(taskService.getAll).toHaveBeenCalled();
    });
  }));
});
