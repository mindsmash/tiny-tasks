import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { of } from 'rxjs';

import { TaskService } from '../task.service';
import { TaskListComponent } from './task-list.component';
import { Status } from '../task';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;
  let mockedEvent:any= {
    container: {
      data: [{id: 'test1', name: 'Todo1', checked: false, status: Status.inProgress},
      {id: 'test2', name: 'Todo2', checked: true, status: Status.blocked},
      {id: 'test3', name: 'Todo3', checked: false, status: Status.inProgress}]
    },
    previousContainer: {
      data: [{id: 'test1', name: 'done1', checked: false, status: Status.inProgress},
      {id: 'test2', name: 'done2', checked: false, status: Status.blocked}]
    },
    previousIndex: 1,
    currentIndex:0
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      providers: [{
        provide: 'TaskService',
        useValue: jasmine.createSpyObj('taskService', ['delete', 'markAsDone', 'update'])
      }]
    }).overrideTemplate(TaskListComponent, '')
      .compileComponents();

    taskService = TestBed.get('TaskService');
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
    component.delete({id: 'id', name: 'My task', checked: true, status: Status.inProgress});

    // then
    expect(taskService.delete).toHaveBeenCalledWith('id');
  });

  it('should emit the task after deletion', () => {
    // given
    taskService.delete.and.returnValue(of(null));
    const deleteEmitter = spyOn(component.deleted, 'emit');

    // when
    component.delete({id: 'id', name: 'My task',  checked: true, status: Status.inProgress});

    // then
    expect(deleteEmitter).toHaveBeenCalledWith({id: 'id', name: 'My task', checked: true, status: Status.inProgress});
  });
  
  it('should toggle the checkbox of a task', () => {
    // given
    taskService.markAsDone.and.returnValue(of(null));

    // when
    component.toggle({id: 'test1', name: 'task1', checked: true, status: Status.inProgress});

    // then
    expect(taskService.markAsDone).toHaveBeenCalledWith('test1');
  });

  it('should emit the task after checked', () => {
    // given
    taskService.markAsDone.and.returnValue(of(null));
    const checkedEmitter = spyOn(component.checked, 'emit');

    // when
    component.toggle({id: 'test1', name: 'task1',  checked: true, status: Status.inProgress});

    // then
    expect(checkedEmitter).toHaveBeenCalledWith({id: 'test1', name: 'task1',  checked: true, status: Status.inProgress});
  });
  it('should update the status of a task', () => {
    // given
    taskService.update.and.returnValue(of(null));

    // when
    component.update({id: 'test1', name: 'task1', checked: true, status: Status.inProgress});

    // then
    expect(taskService.update).toHaveBeenCalledWith({id: 'test1', name: 'task1',  checked: true, status: Status.inProgress});
  });

  it('should emit the task after status is updated', () => {
    // given
    taskService.update.and.returnValue(of(null));
    const updateEmitter = spyOn(component.statusChange, 'emit');

    // when
    component.update({id: 'test1', name: 'task1',  checked: true, status: Status.inProgress});

    // then
    expect(updateEmitter).toHaveBeenCalledWith({id: 'test1', name: 'task1',  checked: true, status: Status.inProgress});
  });
  it('should drop a dragged element from done list to the todo list', () => {
    taskService.markAsDone.and.returnValue(of({}));
    const checkedEmitter = spyOn(component.checked, 'emit');
    component.drop(mockedEvent);
    expect(mockedEvent.container.data).toContain(jasmine.objectContaining(    
      {id: 'test2', name: 'done2', checked: false, status: Status.blocked}
      ));
    expect(taskService.markAsDone).toHaveBeenCalledWith('test2');
    expect(mockedEvent.previousContainer.data.length).toBe(1);
    expect(mockedEvent.container.data.length).toBe(4);
    expect(checkedEmitter).toHaveBeenCalledWith( {id: 'test2', name: 'done2', checked: false, status: Status.blocked});
  
  });
});
