import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { TaskService } from './tasks/task.service';
import { Status } from './tasks/enums';
import { TaskList } from './tasks/task';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let taskService: jasmine.SpyObj<TaskService>;

  const initialValue: TaskList[] = [
    {
      id: Status.TODO,
      name: 'To Do',
      data: [],
    },
    {
      id: Status.DONE,
      name: 'Done',
      data: [],
    }
  ];

  beforeEach(waitForAsync(() => {
    taskService = jasmine.createSpyObj('TaskService', ['getAll', 'init']);
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{
        provide: 'TaskService',
        useValue: taskService
      },
      {
        provide: MatDialogRef,
        useValue: {}
      }],
      imports: [
        MatDialogModule
      ]
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
    const tasks$ = of(initialValue);

    taskService.init.and.returnValue(tasks$);

    // when
    component.ngOnInit();

    // then
    expect(component.tasks$).toEqual(tasks$);
  });

  it('should reload the tasks after task creation', () => {
    // given
    const tasks$ = of(initialValue);
    taskService.getAll.and.returnValue(tasks$);

    // when
    component.created();

    // then
    expect(component.tasks$).toEqual(tasks$);
    expect(taskService.getAll).toHaveBeenCalled();
  });

  it('should reload the tasks after task deletion', () => {
    // given
    const tasks$ = of(initialValue);
    taskService.getAll.and.returnValue(tasks$);

    // when
    component.deleted();

    // then
    expect(component.tasks$).toEqual(tasks$);
    expect(taskService.getAll).toHaveBeenCalled();
  });
});
