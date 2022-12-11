import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { TaskService } from '../task.service';
import { TaskStore } from '../task.store';
import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;
  let taskStore: jasmine.SpyObj<TaskStore>;

  beforeEach(waitForAsync(() => {
    taskService = jasmine.createSpyObj('taskService', {
      'delete': of(void 0), 
      'getAll': of([])});
    taskStore = jasmine.createSpyObj('taskStore', ['delete', 'loadTasks']);
    TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      providers: [{
        provide: 'TaskService',
        useValue: taskService
      },
      {
        provide: 'TaskStore',
        useValue: taskStore
      }]
    }).overrideTemplate(TaskListComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete a task', () => {
    // given
    taskService.delete.and.returnValue(of(void 0));

    // when
    component.delete({id: 'id', name: 'My task', status: 'New'});

    // then
    expect(taskService.delete).toHaveBeenCalledWith('id');
  });

  it('should emit the task after deletion', () => {
    fakeAsync(() => {
      // given
      taskService.delete.and.returnValue(of(void 0));

      // when
      component.delete({id: 'id', name: 'My task', status: 'Done'});
      tick(200);
      
      // then
      expect(taskStore.delete).toHaveBeenCalledWith('id');
    })
  });
});
