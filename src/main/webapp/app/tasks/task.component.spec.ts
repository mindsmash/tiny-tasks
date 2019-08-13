import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { of, Subject } from 'rxjs';

import { TaskComponent } from './task.component';
import { TaskService } from './task.service';
import { ActivatedRoute } from '@angular/router';

describe('TaskComponent', () => {
  let fixture: ComponentFixture<TaskComponent>;
  let component: TaskComponent;
  let taskService: jasmine.SpyObj<TaskService>;
  let  queryParams = new Subject();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskComponent],
      providers: [{
        provide: 'TaskService',
        useValue: jasmine.createSpyObj('TaskService', ['getAll'])
      },
      {
        provide: ActivatedRoute,
        useValue: {
          queryParams : queryParams
        }
      }
    ]
    }).overrideTemplate(TaskComponent, '')
      .compileComponents();

    taskService = TestBed.get('TaskService');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
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
});
