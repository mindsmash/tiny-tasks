import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { TaskService } from '../task.service';
import { TaskListComponent } from './task-list.component';
import { TaskState } from 'src/main/webapp/app/enum/task-state.enum';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

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
    taskService.delete.and.returnValue(of(void 0));

    // when
    component.delete({ id: 'id', name: 'My task' });

    // then
    expect(taskService.delete).toHaveBeenCalledWith('id');
  });

  it('should emit the task after deletion', () => {
    // given
    taskService.delete.and.returnValue(of(void 0));
    const deleteEmitter = spyOn(component.deleted, 'emit');

    // when
    component.delete({ id: 'id', name: 'My task' });

    // then
    expect(deleteEmitter).toHaveBeenCalledWith({ id: 'id', name: 'My task' });
  });

  it('should filter tasks by state', () => {
    // given
    component.tasks = [
      { id: 'id1', name: 'My task1' },
      { id: 'id2', name: 'My task2', state: TaskState.TODO },
      { id: 'id3', name: 'My task3', state: TaskState.IN_PROGRESS },
      { id: 'id4', name: 'My task4', state: TaskState.BLOCKED },
      { id: 'id5', name: 'My task5', state: TaskState.DONE }
    ];

    // when
    component.filterTasksByState();

    // then
    expect(component.toDoTasks).toEqual([
      { id: 'id1', name: 'My task1' },
      { id: 'id2', name: 'My task2', state: TaskState.TODO }
    ]);
    expect(component.inProgressTasks).toEqual([
      { id: 'id3', name: 'My task3', state: TaskState.IN_PROGRESS }
    ]);
    expect(component.blockedTasks).toEqual([
      { id: 'id4', name: 'My task4', state: TaskState.BLOCKED }
    ]);
    expect(component.doneTasks).toEqual([
      { id: 'id5', name: 'My task5', state: TaskState.DONE }
    ]);
  });

});
