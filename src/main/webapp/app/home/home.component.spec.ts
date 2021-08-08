import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TaskService } from 'app/tasks/task.service';
import { of } from 'rxjs';
import { HomeComponent } from 'app/home/home.component';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(
    waitForAsync(() => {
      taskService = jasmine.createSpyObj('TaskService', {getAll: of([])});
      TestBed.configureTestingModule({
        declarations: [HomeComponent],
        providers: [
          {
            provide: 'TaskService',
            useValue: taskService,
          },
        ],
      })
        .overrideTemplate(HomeComponent, '')
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(
    'should create',
    waitForAsync(() => {
      expect(component).toBeTruthy();
    })
  );

  it('should init the tasks', () => {
    // given
    const tasks = [];

    // when
    component.ngOnInit();

    // then
    component.tasks$.subscribe((componentTasks) => {
      expect(componentTasks).toEqual(tasks);
    });
  });

  it('should reload the tasks after task creation', () => {
    // given
    const tasks = [];

    // when
    component.created();

    // then
    component.tasks$.subscribe((componentTasks) => {
      expect(componentTasks).toEqual(tasks);
    });
    expect(taskService.getAll).toHaveBeenCalled();
  });

  it('should reload the tasks after task deletion', () => {
    // given
    const tasks = [];

    // when
    component.deleted();

    // then
    component.tasks$.subscribe((componentTasks) => {
      expect(componentTasks).toEqual(tasks);
    });
    expect(taskService.getAll).toHaveBeenCalled();
  });
});
