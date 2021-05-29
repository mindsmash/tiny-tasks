import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { Task, TaskList } from './tasks/task';
import { TaskService } from './tasks/task.service';
import { Status } from './tasks/enums';
import { ModalComponent } from './shared/components/modal/modal.component';
import { StatusFormComponent } from './tasks/status-form/status-form.component';
import { DataHelper } from './shared/helpers';

@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  tasks$: Observable<TaskList[] | Task[]>;
  public defaultTasksStatus = Status;
  @ViewChild('deleteDoneTasksModal') deleteDoneTasksModal: TemplateRef<any>;

  constructor(
    @Inject('TaskService') private taskService: TaskService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.tasks$ = this.taskService.init();
  }

  created(): void {
    this.tasks$ = this.taskService.getAll();
  }

  deleted(): void {
    this.tasks$ = this.taskService.getAll();
  }

  /**
   * change task status by using drag and drop
   * @param event drag drop event
   * @param taskList list of all tasks
   */
  drop(event: CdkDragDrop<Task[]>, taskList: TaskList[]): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      taskList = DataHelper.setTaskListData(taskList, event.previousContainer);
    }
    taskList = DataHelper.setTaskListData(taskList, event.container);
    this.tasks$ = this.taskService.updateAll(taskList);
  }

  /**
   * delete all task is done status.
   * @param taskList list of all tasks
   */
  deleteAllDoneTasks(taskList: TaskList[]): void {
    const dialogRef = this.dialog.open(this.deleteDoneTasksModal, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.tasks$ = this.taskService.updateAll(DataHelper.setTaskListData(taskList, {
          id: this.defaultTasksStatus.DONE,
          data: []
        }));
        this.cd.detectChanges();
      }
    });
  }

  /**
   * open add new status modal
   */
  addNewStatus(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '350px',
      data: { component: StatusFormComponent }
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.tasks$ = this.taskService.init();
      this.cd.detectChanges();
    });
  }

  /**
   * TrackBy to increase performance
   * @param index item index number
   * @returns item index number
   */
  trackByFn(index: number): number {
    return index;
  }
}
