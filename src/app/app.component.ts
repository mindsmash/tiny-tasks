import { Component, ChangeDetectorRef } from '@angular/core';
import { Task } from './dataobjects/Tasks.model';
import { MatDialog } from '@angular/material';
import { CreateTaskDialogComponent } from './components/create-task-dialog/create-task-dialog.component';
import {StatusLabelComponent} from './components/status-label/status-label.component';
import { TaskStatusEnum } from './enums/taskStatusEnum';

@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {

  tasks: Task[] = [];
  displayColumns: String[] = ["id", "name", "dueDate", "category", "status", "description"];

  statusOptions : string[] = [];

  statuses: any = {
    Done: 0,
    Process: 0,
    Fail: 0
  }

  constructor(public dialog: MatDialog, private changeDetectRef: ChangeDetectorRef) {
    this.statusOptions =  Object.keys(TaskStatusEnum);    
  }

  calculateStatues() {
    this.statuses = {
      Done: 0,
      Process: 0,
      Fail: 0
    }

    this.tasks.forEach((element: Task) => {
      this.statuses[element.status]++;
    });
    this.changeDetectRef.detectChanges();
  }

  /**
   * Adds a new task to the list of tasks.
   *
   * @param task the task's description
   */
  add(task: Task): void {
    this.tasks = this.tasks.concat([task]);
    this.calculateStatues();
  }

  /**
   * Removes the task with the given index from the list of tasks.
   *
   * @param index the index of the task to be removed
   */
  remove(index: number): void {
    this.tasks.splice(index, 1);
  }

  /**
   * Clears the list of tasks.
   */
  clear(): void {
    this.tasks.splice(0);
  }

  /**
   * Open add task dialog
   *
   */
  openDialog(): void {
    let task;
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      width: '400px',
      data: { task }
    });

    dialogRef.afterClosed().subscribe((result: Task) => {
      let task = new Task(this.tasks.length + 1 + '', result.name, result.dueDate, result.category, result.status, result.description);
      this.add(task);
    });
  }

  getColor(status: TaskStatusEnum){
    return StatusLabelComponent.getColor(status);
  }

  onStatusUpdate(event){
    this.calculateStatues();
    this.changeDetectRef.detectChanges();
  }
}
