import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { StatusDialogComponent } from '../../components/status-dialog/status-dialog.component';
import { Status } from '../../shared/status';

import { TaskService } from '../task.service';
import { TaskListComponent } from './task-list.component';

const newTask = {
  id: '0',
  name: 'New Task 1',
  status: Status.NEW,
};

const doneTask = {
  id: '1',
  name: 'Done Task',
  status: Status.DONE,
};

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  describe('base actions', () => {
    beforeEach(waitForAsync(() => {
      taskService = jasmine.createSpyObj('taskService', [
        'delete',
        'update',
        'clearDoneTasks',
      ]);
      TestBed.configureTestingModule({
        declarations: [TaskListComponent],
        providers: [
          {
            provide: 'TaskService',
            useValue: taskService,
          },
          {
            provide: ActivatedRoute,
            useValue: { queryParams: of() },
          },
        ],
        imports: [MatDialogModule, MatButtonModule],
      })
        .overrideTemplate(TaskListComponent, '')
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
      component.delete(newTask);

      // then
      expect(taskService.delete).toHaveBeenCalledWith('0');
    });

    it('should emit the task after deletion', () => {
      // given
      taskService.delete.and.returnValue(of(void 0));
      const deleteEmitter = spyOn(component.deleted, 'emit');

      // when
      component.delete(newTask);

      // then
      expect(deleteEmitter).toHaveBeenCalledWith(newTask);
    });

    it('should correctly check if task list has any tasks with status "Done"', () => {
      component.tasks = [newTask];
      component.ngOnChanges();

      expect(component.hasDoneTasks).toBeFalse();

      component.tasks = [doneTask];
      component.ngOnChanges();

      expect(component.hasDoneTasks).toBeTrue();
    });

    it('should correctly emit when calling refreshTasks', () => {
      const refreshSpy = spyOn(component.refresh, 'emit');
      const searchSpy = spyOn(component.search, 'emit');

      component.refreshTasks();
      expect(refreshSpy).toHaveBeenCalled();
      expect(searchSpy).not.toHaveBeenCalled();

      refreshSpy.calls.reset();
      searchSpy.calls.reset();

      component.searchInput.setValue('Task 1');
      component.refreshTasks();

      expect(refreshSpy).not.toHaveBeenCalled();
      expect(searchSpy).toHaveBeenCalled();
    });

    it('should call the dialog open method when calling openDialog', () => {
      spyOn(component.dialog, 'open').and.returnValue({
        afterClosed: () => of(),
      } as any);

      component.openDialog(newTask);
      expect(component.dialog.open).toHaveBeenCalledWith(
        StatusDialogComponent,
        {
          width: '350px',
          height: '375px',
          data: newTask,
        }
      );
    });

    it('should call the service when calling updateTask', () => {
      taskService.update.and.returnValue(of(void 0));

      const spy = spyOn(component.refresh, 'emit');

      component.updateTask(newTask);
      expect(taskService.update).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
    });

    it('should call the service when calling clearDoneTasks', () => {
      taskService.clearDoneTasks.and.returnValue(of(void 0));

      const spy = spyOn(component.refresh, 'emit');

      component.clearDoneTasks();

      expect(taskService.clearDoneTasks).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('search', () => {
    beforeEach(waitForAsync(() => {
      taskService = jasmine.createSpyObj('taskService', ['delete']);
      TestBed.configureTestingModule({
        declarations: [TaskListComponent],
        providers: [
          {
            provide: 'TaskService',
            useValue: taskService,
          },
          {
            provide: ActivatedRoute,
            useValue: { queryParams: of({ query: 'Task 1' }) },
          },
        ],
        imports: [
          MatDialogModule,
          MatIconModule,
          MatFormFieldModule,
          MatInputModule,
        ],
      })
        .overrideTemplate(TaskListComponent, '')
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TaskListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should set the searchInput to the value of the query param', () => {
      expect(component.searchInput.value).toEqual('Task 1');
    });

    it('should emit a search event when changing searchInput', () => {
      const spy = spyOn(component.search, 'emit');

      component.searchInput.setValue('new query');

      expect(spy).toHaveBeenCalledWith('new query');
    });
  });
});
