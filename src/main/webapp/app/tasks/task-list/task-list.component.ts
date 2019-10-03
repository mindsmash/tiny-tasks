import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material';

import { Task } from '../task';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { TaskService } from '../task.service';


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

  @Input() tasks: Task[];

  @Output() deleted: EventEmitter<Task> = new EventEmitter();

  constructor(@Inject('TaskService') private taskService: TaskService,
    private dialog: MatDialog) { }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  download(task: Task): void {
    if (task.hasAttach) {
      this.taskService.getAttach(task.id)
        .subscribe(response => {
          const blob = new Blob([response.body], {
            type: response.headers.get('Content-Type'),
          });
          const downloadURL = window.URL.createObjectURL(blob);
          window.open(downloadURL);

        });
    }
  }

  openDialog(task: Task) {
    if (task.imageAttach) {
      this.taskService.getAttach(task.id)
        .subscribe(response => {
          const blob = new Blob([response.body], {
            type: response.headers.get('Content-Type'),
          });
          const dialogConfig = new MatDialogConfig();

          dialogConfig.autoFocus = true;
          dialogConfig.data = {
            srcImg: window.URL.createObjectURL(blob),
            task
          };

          this.dialog.open(TaskDialogComponent, dialogConfig);
        });
    }
  }
}
