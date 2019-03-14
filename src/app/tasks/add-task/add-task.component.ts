import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogAddTaskComponent } from '../dialog-add-task/dialog-add-task.component';
import { TaskService } from '../task.service';
import { Task } from 'src/domain/Task';

@Component({
  selector: 'tiny-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  task: Task = new Task();

  constructor(
    public dialog: MatDialog,
    private taskService: TaskService
  ) { }

  ngOnInit() {
  }

  openDialog() {
    const addTaskDialog = this.dialog.open(DialogAddTaskComponent, {
      width: '250px',
      data: { title: this.task.text, description: this.task.description, dueDate: this.task.dueDate }
    });

    addTaskDialog.afterClosed().subscribe(res => {
      if (res) {
        const task: Task = res;
        this.taskService.add(task);
      }
    });
  }
}
