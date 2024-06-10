import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { of } from 'rxjs';
import { Task } from '../tasks/task';
import { HomeComponent } from './home.component';
import { TaskService } from '../tasks/task.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BASE_URL } from '../app.tokens';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(waitForAsync(() => {
    taskService = jasmine.createSpyObj('TaskService', ['getAll']);
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        {
          provide: 'TaskService',
          useValue: taskService,
        },
        {
          provide: BASE_URL,
          useValue: 'http://backend.tld',
        },
      ],
      imports: [HttpClientTestingModule, RouterTestingModule],
    })
      .overrideTemplate(HomeComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', waitForAsync(() => {
    expect(component).toBeTruthy();
  }));

  it('should init the tasks', fakeAsync(() => {
    // given
    const tasks = ['test1', 'test2'] as any as Task[];
    const tasks$ = of(tasks);
    taskService.getAll.and.returnValue(tasks$);

    // when
    component.ngOnInit();
    tick();
    // then
    component.tasks$.subscribe((t) => {
      expect(t).toEqual(tasks);
      expect(taskService.getAll).toHaveBeenCalled();
    });
  }));

  it('should reload the tasks after task creation', fakeAsync(() => {
    // given
    const tasks = ['test1', 'test2'] as any as Task[];
    const tasks$ = of(tasks);
    taskService.getAll.and.returnValue(tasks$);

    // when
    component.created();
    tick();
    // then
    component.tasks$.subscribe((t) => {
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
    component.tasks$.subscribe((t) => {
      expect(t).toEqual(tasks);
      expect(taskService.getAll).toHaveBeenCalled();
    });
  }));
});
