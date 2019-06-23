import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {AppComponent} from "app/app.component";
import {TaskService} from "app/_shared/_services/task.service";
import {of} from "rxjs";

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{
        provide: 'TaskService',
        useValue: jasmine.createSpyObj('TaskService', ['getAll'])
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
