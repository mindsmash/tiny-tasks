import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../_services/task.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {Task} from '../../_model/task';
import {TaskDialogComponent} from './task-dialog/task-dialog.component';
import {CategoryService} from '../../_services/category.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tasks: any[];
  title: string;

  displayedColumns: string[] = ['id', 'title', 'category', 'actions'];

  constructor(private taskService: TaskService,
              private categoryService: CategoryService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadTasks();
  }

  addOrEditTask({title, category}: Task) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title, category
    };

    const dialogRef = this.dialog.open(TaskDialogComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(
      val => {
        this.taskService.add(val);
        this.loadTasks();
      }
    );

  }

  loadTasks() {
    this.tasks = this.taskService.getAll(null, null);
  }

}
