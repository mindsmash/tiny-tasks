import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { TaskService } from './tasks/task.service';
import { TaskStore } from './tasks/task.store';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let taskService: jasmine.SpyObj<TaskService>;
  let taskStore: jasmine.SpyObj<TaskStore>;

  beforeEach(waitForAsync(() => {
    taskService = jasmine.createSpyObj('TaskService', {'getAll': of([])});
    taskStore = jasmine.createSpyObj('taskStore', ['loadTasks']);
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
    fakeAsync(() => {
      // given
      const tasks$ = of([]);
      taskService.getAll.and.returnValue(tasks$);

      // when
      taskStore.loadTasks();
      tick(200);
      
      // then
      expect(component.tasks$).toEqual(tasks$);
    })
  });
});
