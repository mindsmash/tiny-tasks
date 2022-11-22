import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Task } from '../task';
import { TaskService } from '../task.service';
import { Status } from '../status';
import { TaskStatusDialogComponent } from '../task-status-dialog/task-status-dialog.component';

/**
 * A list of tiny tasks.
 */
@Component({
  selector: 'tiny-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {
  @Input() set tasks(tasks: Task[] | null) {
    if (Array.isArray(tasks)) {
      this.setTaskLists(tasks);
    }
  }

  @Output() deleted: EventEmitter<Task> = new EventEmitter();

  public doneTasks: Task[] = [];
  public openTasks: Task[] = [];

  constructor(
    @Inject('TaskService') private taskService: TaskService,
    public dialog: MatDialog,
    public cd: ChangeDetectorRef
  ) {
  }


  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe({
      next: () => {
        this.deleted.emit(task);
      }
    });
  }

  public dropToDone(event: CdkDragDrop<Task[]>): void {
    this.drop(event);
    this.doneTasks[event.currentIndex].status = Status.DONE;
    this.updateTasks();
  }

  public dropToOpen(event: CdkDragDrop<Task[]>): void {
    this.drop(event);

    if (event.previousContainer.id !== event.container.id) {
      this.getDialogSelection().subscribe({
        next: result => {
          this.openTasks[event.currentIndex].status = result || Status.OPEN;
          this.cd.detectChanges();
          this.updateTasks();
        }
      });
    }

  }


  public editStatus(listName: string, index: number): void {
    const element = (listName === 'doneTasks' ? this.doneTasks : this.openTasks)[index];

    this.getDialogSelection().subscribe({
      next: result => {
        switch (true) {
          case !result:
          case result === element.status:
            return;
          case result === Status.DONE:
            this.moveElementToDone(index);
            break;
          case element.status === Status.DONE:
            this.moveElementToOpen(index, result as Status);
            break;
          case result !== Status.DONE:
            this.changeOpenElementStatus(index, result as Status);
            break;
        }
      }
    });
  }

  public isTaskDone(task: Task): boolean {
    return task.status === Status.DONE;
  }

  public clearDoneTasks(): void {
    this.doneTasks = [];
    this.updateTasks();
  }

  private moveElementToDone(index: number): void {
    const [elm] = this.openTasks.splice(index, 1);
    this.doneTasks = [{...elm, status: Status.DONE}].concat(this.doneTasks);
    this.cd.detectChanges();
    this.updateTasks();
  }

  private moveElementToOpen(index: number, status: Status): void {
    const [elm] = this.doneTasks.splice(index, 1);
    this.openTasks = [{...elm, status}].concat(this.openTasks);
    this.cd.detectChanges();
    this.updateTasks();
  }

  private changeOpenElementStatus(index: number, status: Status): void {
    this.openTasks[index].status = status;
    this.cd.detectChanges();
    this.updateTasks();
  }

  private drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }


  private setTaskLists(tasks: Task[]): void {
    this.doneTasks = [];
    this.openTasks = [];
    tasks.forEach(task => task.status === Status.DONE ? this.doneTasks.push(task) : this.openTasks.push(task));

  }

  private getDialogSelection(): Observable<Status | null> {
    const dialogRef = this.dialog.open(TaskStatusDialogComponent, {width: '300px'});
    return dialogRef.afterClosed().pipe(first());
  }

  private updateTasks(): void {
    this.taskService.updateTasks(this.openTasks.concat(this.doneTasks)).pipe(first()).subscribe();
  }

}
