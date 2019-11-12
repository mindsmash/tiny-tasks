import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { of } from 'rxjs';

import { TaskService } from '../task.service';
import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      providers: [{
        provide: 'TaskService',
        useValue: jasmine.createSpyObj('taskService', ['delete', 'toggleDone'])
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

  it('should toggle done-flag of task', () => {
    // given
    const done = false;
    taskService.toggleDone.and.returnValue(of({id: 'id', name: 'My task', done: done}));


    // when
    component.toggleDone({id: 'id', name: 'My task', done: done});

    // then
    expect(taskService.toggleDone).toHaveBeenCalledWith('id', !done);
  });

  it('should emit the task after toggling done-flag of task', () => {
    // given
    const done = false;
    taskService.toggleDone.and.returnValue(of({id: 'id', name: 'My task', done: done}));
    const patchEmitter = spyOn(component.patched, 'emit');

    // when
    component.toggleDone({id: 'id', name: 'My task', done: done});

    // then
    expect(patchEmitter).toHaveBeenCalledWith({id: 'id', name: 'My task', done: done});
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
});
