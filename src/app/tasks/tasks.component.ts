import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { TASKS, Task } from './mocked-tasks';

@Component({
  selector: 'tiny-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  displayedColumns: string[] = ['description', 'status'];
  dataSource: MatTableDataSource<Task>;

  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Task>(TASKS);
  }
}
