import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { TASKS, Task } from './mocked-tasks';

@Component({
  selector: 'tiny-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  displayedColumns: string[] = ['index', 'description', 'status', 'delete'];
  dataSource: MatTableDataSource<Task>;

  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Task>(TASKS);
  }

  add(description: string): void {
    TASKS.push({ description, status: 'TODO'});
    this.dataSource = new MatTableDataSource<Task>(TASKS);
  }

  remove(index: number): void {
    TASKS.splice(index, 1);
    this.dataSource = new MatTableDataSource<Task>(TASKS);
  }
}
