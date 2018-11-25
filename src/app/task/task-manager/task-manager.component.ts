import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';
import { MatDialog } from '@angular/material';
import { TaskService } from '../task.service';

@Component({
  selector: 'tiny-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent implements OnInit {

  tasks: Array<Task>;
  tasksDone: Array<Task>;

  constructor(
    public dialog: MatDialog,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
    this.tasksDone = this.taskService.getTasksDone();
  }

  clear() {
    this.tasks.splice(0);
    this.taskService.setTasks(this.tasks);
  }

  clearDone() {
    this.tasksDone.splice(0);
    this.taskService.setTasksDone(this.tasksDone);
  }

  taskDone(task: Task) {
    this.tasksDone.push(task);
    this.taskService.setTasksDone(this.tasksDone);
  }

  taskUndone(task: Task) {
    this.tasks.push(task);
    this.taskService.setTasks(this.tasks);
  }

  add() {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      height: '250px',
      width: '250px',
      data: { name: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.tasks.push(result);
      this.taskService.setTasks(this.tasks);
    });
  }
}
