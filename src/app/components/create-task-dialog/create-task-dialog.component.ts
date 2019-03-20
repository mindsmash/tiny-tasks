import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Task } from 'src/app/dataobjects/Tasks.model';
import { TaskStatusEnum } from 'src/app/enums/task.status.enum';
import { CategoryEnum } from 'src/app/enums/category.enum';


@Component({
  selector: 'tiny-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss']
})
export class CreateTaskDialogComponent implements OnInit {

  task: Task;

  statusOptions : string[] = [];
  categoryOptions : string[] = [];

  constructor(
    public dialogRef: MatDialogRef<CreateTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task) {
    this.task = new Task('', data.name, new Date(), data.category, data.status, data.description);
    this.statusOptions =  Object.keys(TaskStatusEnum).sort();   
    this.categoryOptions =  Object.keys(CategoryEnum).sort();   
  }

  ngOnInit() { 
    this.task.clearFields();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onClear(): void {
    this.task.clearFields();
  }
}
