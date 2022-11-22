import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { CdkDropList } from '@angular/cdk/drag-drop/directives/drop-list';

import { TaskListComponent } from './task-list.component';

import { Status } from '../status';
import { Task } from '../task';
import { TaskService } from '../task.service';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;
  let matDialogMock: jasmine.SpyObj<MatDialog>;
  let changeDetectorRefMock: jasmine.SpyObj<ChangeDetectorRef>;

  let tasks: Task[];
  let afterClosedSpy: jasmine.Spy;

  beforeEach(async () => {
    taskService = jasmine.createSpyObj('taskService', ['delete', 'updateTasks']);
    matDialogMock = jasmine.createSpyObj('MatDialog', ['open']);
    changeDetectorRefMock = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);

    afterClosedSpy = jasmine.createSpy();
    taskService.updateTasks.and.returnValue(of([]));
    matDialogMock.open.and.returnValue({afterClosed: afterClosedSpy} as any);
    tasks = [{id: '1', name: 'My task', status: Status.OPEN}, {id: '2', name: 'My task', status: Status.DONE}];

    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      providers: [
        {provide: 'TaskService', useValue: taskService},
        {provide: MatDialog, useValue: matDialogMock},
        {provide: ChangeDetectorRef, useValue: changeDetectorRefMock},
      ]
    }).overrideTemplate(TaskListComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    component.tasks = tasks;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete a task', () => {
    // given
    taskService.delete.and.returnValue(of(void 0));

    // when
    component.delete({id: 'id', name: 'My task', status: Status.DONE});

    // then
    expect(taskService.delete).toHaveBeenCalledWith('id');
  });

  it('should emit the task after deletion', () => {
    // given
    taskService.delete.and.returnValue(of(void 0));
    const deleteEmitter = spyOn(component.deleted, 'emit');

    // when
    component.delete({id: 'id', name: 'My task', status: Status.DONE});

    // then
    expect(deleteEmitter).toHaveBeenCalledWith({id: 'id', name: 'My task', status: Status.DONE});
  });

  it('should set doneTasks on input set', () => {
    // component.tasks = tasks;
    expect(component.doneTasks).toEqual([tasks[1]]);
  });

  it('should set openTasks on input set', () => {
    // component.tasks = tasks;
    expect(component.openTasks).toEqual([tasks[0]]);
  });

  describe('dropToDone -', () => {
    let dropSpy: jasmine.Spy;
    beforeEach(() => {
      dropSpy = spyOn<any>(component, 'drop');
      component.dropToDone({currentIndex: 0} as CdkDragDrop<Task[]>);
    })

    it('should call drop', () => {
      expect(dropSpy).toHaveBeenCalled();
    });

    it('should update the elements status', () => {
      expect(component.doneTasks[0].status).toBe(Status.DONE);
    });

    it('should call updateTasks', () => {
      expect(taskService.updateTasks).toHaveBeenCalled();
    });
  })

  describe('dropToOpen -', () => {
    let dropSpy: jasmine.Spy;
    beforeEach(() => {
      dropSpy = spyOn<any>(component, 'drop');
      afterClosedSpy.and.returnValue(of(Status.IN_PROGRESS));

      component.dropToOpen({
        currentIndex: 0,
        previousContainer: {id: '1'} as CdkDropList<Task[]>,
        container: {id: '2'} as CdkDropList<Task[]>
      } as CdkDragDrop<Task[]>);
    })

    it('should call drop method', () => {
      expect(dropSpy).toHaveBeenCalled();
    });

    it('should update the elements status', () => {
      expect(component.openTasks[0].status).toBe(Status.IN_PROGRESS);
    });

    it('should call updateTasks', () => {
      expect(taskService.updateTasks).toHaveBeenCalled();
    });
  })

  describe('editStatus -', () => {
    it('should not change array if no dialog selection', () => {
      afterClosedSpy.and.returnValue(of(null));
      component.editStatus('openTasks', 0);
      expect(component.openTasks).toEqual([tasks[0]]);
    });

    it('should not change array if status did not change', () => {
      afterClosedSpy.and.returnValue(of(Status.OPEN));
      component.editStatus('openTasks', 0);
      expect(component.openTasks).toEqual([tasks[0]]);
    });

    describe('moving element to done', () => {
      beforeEach(() => {
        afterClosedSpy.and.returnValue(of(Status.DONE));
        component.editStatus('openTasks', 0);
      })

      it('should remove element from openTasks', () => {
        expect(component.openTasks.length).toBe(0);
      });

      it('should add element from doneTasks', () => {
        expect(component.doneTasks[0]).toEqual({...tasks[0], status: Status.DONE});
      });

      it('should call updateTasks', () => {
        expect(taskService.updateTasks).toHaveBeenCalled();
      });
    })

    describe('should moving element to open', () => {
      beforeEach(() => {
        afterClosedSpy.and.returnValue(of(Status.OPEN));
        component.editStatus('doneTasks', 0);
      })

      it('should remove element from doneTasks', () => {
        expect(component.doneTasks.length).toBe(0);
      });

      it('should add element from openTasks', () => {
        expect(component.openTasks[0]).toEqual({...tasks[1], status: Status.OPEN});
      });

      it('should call updateTasks', () => {
        expect(taskService.updateTasks).toHaveBeenCalled();
      });
    })

    describe('should changing an elements status', () => {
      beforeEach(() => {
        afterClosedSpy.and.returnValue(of(Status.IN_PROGRESS));
        component.editStatus('openTasks', 0);
      })

      it('should change status property', () => {
        expect(component.openTasks[0]).toEqual({...tasks[0], status: Status.IN_PROGRESS});
      });

      it('should call updateTasks', () => {
        expect(taskService.updateTasks).toHaveBeenCalled();
      });
    })

  })
  describe('clearDoneTasks -', () => {
    it('should set doneTasks to empty array', () => {
      component.clearDoneTasks();
      expect(component.doneTasks.length).toBe(0);
    });

    it('should updateTasks', () => {
      component.clearDoneTasks();
      expect(taskService.updateTasks).toHaveBeenCalled();
    });
  })

  describe('isTaskDone -', () => {
    it('should true if status is DONE', () => {
      expect(component.isTaskDone(tasks[1])).toBe(true);
    });
  })
});
