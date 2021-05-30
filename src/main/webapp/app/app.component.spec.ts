import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { TaskService } from './tasks/task.service';
import { Status } from './tasks/enums';
import { Task, TaskList } from './tasks/task';
import { CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let taskService: jasmine.SpyObj<TaskService>;

  const initialValue: TaskList[] = [
    { id: Status.TODO, name: 'To Do', data: [], },
    { id: Status.DONE, name: 'Done', data: [], }
  ];

  const mockValue: TaskList[] = [
    { id: Status.TODO, name: 'To Do', data: [{ id: '33f36c73-d985-4b99-82ed-d56df37c5f29', name: 'test' }] },
    { id: Status.DONE, name: 'Done', data: [] }
  ];

  beforeEach(waitForAsync(() => {
    taskService = jasmine.createSpyObj('TaskService', ['getAll', 'init', 'updateAll']);
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

  it('should change the tasks status after drag and drop', () => {
    // given
    const tasks$ = of(mockValue);
    // taskService.getAll.and.returnValue(tasks$);

    const event: CdkDragDrop<Task[]> = {
      previousIndex: 0,
      currentIndex: 0,
      item: undefined,
      container: ({ id: 'done', data: [] } as CdkDropList<Task[]>),
      previousContainer: ({ id: 'todo', data: [{ id: '33f36c73-d985-4b99-82ed-d56df37c5f29', name: 'test' }] } as CdkDropList<Task[]>),
      isPointerOverContainer: true,
      distance: { x: 0, y: 0 }
    };

    // when
    taskService.updateAll.and.returnValue(tasks$);
    component.drop(event, mockValue);

    // then
    expect(component.tasks$).toEqual(tasks$);
    expect(taskService.updateAll).toHaveBeenCalled();
  });
});
