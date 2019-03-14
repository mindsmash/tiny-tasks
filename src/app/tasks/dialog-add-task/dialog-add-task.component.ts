import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'tiny-dialog-add-task',
  templateUrl: './dialog-add-task.component.html',
  styleUrls: ['./dialog-add-task.component.scss']
})
export class DialogAddTaskComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogAddTaskComponent>, @Inject(MAT_DIALOG_DATA) public data: TaskDialogData) { }

  ngOnInit() {
  }

  addTask(): void {
    console.log(this.data);
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}


export interface TaskDialogData {
  title: string;
  description: string;
  dueDate: Date;
}
