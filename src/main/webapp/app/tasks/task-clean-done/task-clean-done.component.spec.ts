import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { TaskCleanDoneComponent } from './task-clean-done.component';
import {TaskListComponent} from "../task-list/task-list.component";
import {TaskService} from "../task.service";
import {of} from "rxjs";

describe('TaskCleanDoneComponent', () => {
  let component: TaskCleanDoneComponent;
  let fixture: ComponentFixture<TaskCleanDoneComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(waitForAsync(() => {
    taskService = jasmine.createSpyObj('taskService', ['clearDone']);
    TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      providers: [{
        provide: 'TaskService',
        useValue: taskService
      }]
    }).overrideTemplate(TaskCleanDoneComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCleanDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove done tasks', () => {
    // given
    taskService.clearDone.and.returnValue(of([{id: 'id', name: 'My task', isDone: false}]));

    // when
    component.clearDoneTasks();

    // then
    expect(taskService.clearDone).toHaveBeenCalled();
  });

  it('should emit the tasks not done after clear done tasks', () => {
    // given
    taskService.clearDone.and.returnValue(of([{id: 'id', name: 'My task', isDone: false}]));
    const cleanedDoneEmitter = spyOn(component.cleanedDone, 'emit');

    // when
    component.clearDoneTasks();

    // then
    expect(cleanedDoneEmitter).toHaveBeenCalledWith([{id: 'id', name: 'My task', isDone: false}]);
  });

});
