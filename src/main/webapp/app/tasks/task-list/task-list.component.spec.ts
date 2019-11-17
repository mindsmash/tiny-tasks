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
        useValue: jasmine.createSpyObj('taskService', ['delete', 'patch'])
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

  it('should mark task as done', () => {
    // given
    taskService.patch.and.returnValue(of(null));

    // when
    component.toggleDone({id: 'id', name: 'My task', done: false});

    // then
    expect(taskService.patch).toHaveBeenCalledWith('id', { done: true });
  });

  it('should emit the task after mark done', () => {
    // given
    taskService.patch.and.returnValue(of(null));
    const patchEmitter = spyOn(component.patched, 'emit');

    // when
    component.toggleDone({id: 'id', name: 'My task', done: false});

    // then
    expect(patchEmitter).toHaveBeenCalledWith({id: 'id', name: 'My task', done: false});
  });

  it('should delete a task', () => {
    // given
    taskService.delete.and.returnValue(of(null));

    // when
    component.delete({id: 'id', name: 'My task', done: false});

    // then
    expect(taskService.delete).toHaveBeenCalledWith('id');
  });

  it('should emit the task after deletion', () => {
    // given
    taskService.delete.and.returnValue(of(null));
    const deleteEmitter = spyOn(component.deleted, 'emit');

    // when
    component.delete({id: 'id', name: 'My task', done: false});

    // then
    expect(deleteEmitter).toHaveBeenCalledWith({id: 'id', name: 'My task', done: false});
  });
});
