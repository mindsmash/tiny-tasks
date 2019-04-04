import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'tiny-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  tasks$: Observable<Task[]>;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.tasks$ = this.taskService.getAll();
  }

  delete(task: Task) {
    this.taskService.delete(task.id).subscribe();
  }
}
