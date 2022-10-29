import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { of } from 'rxjs';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(waitForAsync(() => {
    taskService = jasmine.createSpyObj('taskService', ['delete', 'saveTaskData']);
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
    const loadEmitter = spyOn(component.loadTasks, 'emit');

    // when
    component.delete({ id: 'id', name: 'My task' });

    // then
    expect(loadEmitter).toHaveBeenCalled();
  });

  it('should call saveTaskData onSetTaskDueDate', () => {
    const task: Task = { id: 'id', name: 'My task', dueDate: 'oldDueDate' };
    const newDueDate: Date = new Date();
    taskService.saveTaskData.and.returnValue(of(void 0));
    const loadEmitter = spyOn(component.loadTasks, 'emit');
    component.onSetTaskDueDate({ value: newDueDate } as MatDatepickerInputEvent<Date>, task);
    expect(taskService.saveTaskData).toHaveBeenCalledWith({ id: 'id', name: 'My task', dueDate: newDueDate });
    expect(loadEmitter).toHaveBeenCalled();
  });
});
