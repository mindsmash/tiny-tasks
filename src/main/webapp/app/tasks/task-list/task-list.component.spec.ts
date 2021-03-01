import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { Task } from '../task';

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

  it('should remove all done tasks only', () => {
    // given
    const tasks: Task[] = [
      { name:'task 1', id: '1' , isDone: false },
      { name:'task 2', id: '2' , isDone: false },
      { name:'task 3', id: '3' , isDone: true },
      { name:'task 4', id: '4' , isDone: false },
      { name:'task 5', id: '5' , isDone: true }
    ];
    
    component.tasks = tasks;
    taskService.delete.and.returnValue(of(null));
    const deleteEmitter = spyOn(component.deleted, 'emit');

    // when 
    component.clearAllDoneTasks();

    // then
    expect(taskService.delete).toHaveBeenCalledWith('3');
    expect(deleteEmitter).toHaveBeenCalledWith({ name:'task 3', id: '3' , isDone: true })

    expect(taskService.delete).toHaveBeenCalledWith('5');
    expect(deleteEmitter).toHaveBeenCalledWith({ name:'task 5', id: '5' , isDone: true })
    
  })
});
