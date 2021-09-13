import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { TaskService } from '../task.service';
import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(waitForAsync(() => {
    taskService = jasmine.createSpyObj('taskService', ['delete', 'toggleCompletion', 'clearCompletedTasks']);
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
    component.delete({id: 'id', name: 'My task', completed: false});

    // then
    expect(taskService.delete).toHaveBeenCalledWith('id');
  });

  it('should emit the task after deletion', () => {
    // given
    taskService.delete.and.returnValue(of(void 0));
    const deleteEmitter = spyOn(component.deleted, 'emit');

    // when
    component.delete({id: 'id', name: 'My task', completed: false});

    // then
    expect(deleteEmitter).toHaveBeenCalledWith({id: 'id', name: 'My task', completed: false});
  });

  it('should toggle the completion of a task', () => {
    // given
    taskService.toggleCompletion.and.returnValue(of(void 0));

    //when
    taskService.toggleCompletion({id: 'id', name: 'My task', completed: false});

    //then
    expect(taskService.toggleCompletion).toHaveBeenCalledWith({id: 'id', name: 'My task', completed: false});
  });

  it('should emit the task that the completion was toggled for', () => {
    // given
    taskService.toggleCompletion.and.returnValue(of(void 0));
    const completionEmitter = spyOn(component.completionToggled, 'emit')

    // when
    component.toggleCompletion({id: 'id', name: 'My task', completed: false});

    // then
    expect(completionEmitter).toHaveBeenCalledWith({id: 'id', name: 'My task', completed: false});
  });

  it('should clear tasks that are done when button is pressed', () => {
    // given
    taskService.clearCompletedTasks.and.returnValue(of(void 0));

    // when
    component.clearTasks();

    // then
    expect(taskService.clearCompletedTasks).toHaveBeenCalled();
  });

  it('should emit that tasks have been cleared', () => {
      // given
      taskService.clearCompletedTasks.and.returnValue(of(void 0));
      const clearTasksEmitter = spyOn(component.tasksCleared, 'emit')
  
      // when
      component.clearTasks();
  
      // then
      expect(clearTasksEmitter).toHaveBeenCalled();
  });
});
