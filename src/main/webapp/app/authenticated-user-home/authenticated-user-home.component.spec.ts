import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatedUserHomeComponent } from './authenticated-user-home.component';
import {TaskService} from "app/tasks/task.service";
import {AppComponent} from "app/app.component";
import {of} from "rxjs";

describe('AuthenticatedUserHomeComponent', () => {
  let component: AuthenticatedUserHomeComponent;
  let fixture: ComponentFixture<AuthenticatedUserHomeComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{
        provide: 'TaskService',
        useValue: jasmine.createSpyObj('TaskService', ['getAll'])
      }]
    }).overrideTemplate(AuthenticatedUserHomeComponent, '')
      .compileComponents();

    taskService = TestBed.get('TaskService');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticatedUserHomeComponent);
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
