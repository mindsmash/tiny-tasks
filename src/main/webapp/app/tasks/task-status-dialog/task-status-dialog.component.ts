import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Status } from '../status';


@Component({
  selector: 'tiny-task-status-dialog',
  templateUrl: './task-status-dialog.component.html',
  styleUrls: ['./task-status-dialog.component.scss']
})
export class TaskStatusDialogComponent {
  public options = Object.values(Status);
  public selectedStatus = Status.OPEN;

  constructor(public dialogRef: MatDialogRef<TaskStatusDialogComponent>) {
  }

  public choose(): void {
    this.dialogRef.close(this.selectedStatus);
  }
}
