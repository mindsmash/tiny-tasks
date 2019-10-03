import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';

import { MatDialog, MatDialogConfig } from "@angular/material";

import { Task } from '../task';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component'
import { TaskService } from '../task.service';
import { from } from 'rxjs';


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
    // if (task.image) {
    //   console.log(task.image.toString());
    //   const binary = atob(task.image.toString());
    //   var array = new Uint8Array(binary.length)
    //   for (var i = 0; i < binary.length; i++) { array[i] = binary.charCodeAt(i) }
    //   const blob = new Blob([array], { type: task.image.type })
    //   var url = window.URL.createObjectURL(blob);
    //   window.open(url);
    // }
  }

  openDialog(task: Task) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;

    this.dialog.open(TaskDialogComponent, dialogConfig);
  }
}
