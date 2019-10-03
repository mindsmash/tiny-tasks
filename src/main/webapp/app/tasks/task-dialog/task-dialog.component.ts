import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Task } from '../task';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'tiny-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent {

  srcImg;
  task: Task;

  constructor(private dialogRef: MatDialogRef<TaskDialogComponent>,
    private sanitizer : DomSanitizer,
    @Inject(MAT_DIALOG_DATA) data) {

    this.srcImg = this.sanitizer.bypassSecurityTrustUrl(data.srcImg);

    this.task = data.task;

  }

}
