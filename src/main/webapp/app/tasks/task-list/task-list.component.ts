import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';

import { Task } from '../task';
import { TaskService } from '../task.service';

/**
 * A list of tiny tasks.
 */
@Component({
  selector: 'tiny-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  @Input() tasks: Task[];

  @Output() deleted: EventEmitter<Task> = new EventEmitter();
  @Output() updated: EventEmitter<Task> = new EventEmitter();

  constructor(
    @Inject('TaskService') private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {}

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(
      () => {
        this.deleted.emit(task);
        this.snackBar.open('Task deleted!', null, { duration: 2000 });
      },
      (error) => {
        this.snackBar.open('Task deletion failed!', null, { duration: 2000 });
      }
    );
  }

  toggleStatus(task: Task) {
    task.done = !task.done;
    this.taskService.update(task).subscribe(
      () => {
        this.updated.emit();
        this.snackBar.open('Task status updated!', null, { duration: 2000 });
      },
      (error) => {
        this.snackBar.open('Task status update failed!', null, {
          duration: 2000,
        });
      }
    );
  }

  deleteAllDone() {
    const doneTasks = this.tasks.filter((task) => task.done);
    forkJoin(
      doneTasks.map((task) => {
        return this.taskService.delete(task.id);
      })
    ).subscribe(
      (result) => {
        this.deleted.emit();
        this.snackBar.open('All done tasks deleted!', null, { duration: 2000 });
      },
      (error) => {
        this.snackBar.open('Batch delete failed!', null, { duration: 2000 });
      }
    );
  }
}
