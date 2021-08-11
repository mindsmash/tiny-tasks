import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TaskFilter } from 'app/pipes/app.task.filter';
import { of } from 'rxjs';

import { TaskService } from '../task.service';
import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(waitForAsync(() => {
    taskService = jasmine.createSpyObj('taskService', ['delete']);
    TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      providers: [{
        provide: 'TaskService',
        useValue: taskService
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
    taskService.delete.and.returnValue(of(null));

    // when
    component.delete({id: 'id', name: 'My task'});

    // then
    expect(taskService.delete).toHaveBeenCalledWith('id');
  });

  it('should emit the task after deletion', () => {
    // given
    taskService.delete.and.returnValue(of(null));
    const deleteEmitter = spyOn(component.deleted, 'emit');

    // when
    component.delete({id: 'id', name: 'My task'});

    // then
    expect(deleteEmitter).toHaveBeenCalledWith({id: 'id', name: 'My task'});
  });

  it('should filter the task using a search term', () => {
    // given
    component.tasks = [];
    component.tasks.push({id: 'id1', name: 'My task 1'});
    component.tasks.push({id: 'id2', name: 'My task 2'});

    // when
    component.searchTerms = 'task 2'

    // then
    expect(component.tasks).lengthOf(1);
  });

  it('should filter the task using a search pattern', () => {
    // given
    component.tasks = [];
    component.tasks.push({id: 'id1', name: 'cat, dog, fish'});
    component.tasks.push({id: 'id2', name: 'cat'});
    component.tasks.push({id: 'id2', name: 'eagle'});

    // when
    component.searchTerms = 'fish [AND] eagle'

    // then
    expect(component.tasks).lengthOf(2);
  });
});
