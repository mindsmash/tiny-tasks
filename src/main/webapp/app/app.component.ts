import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {FINISHED_TASK_STATUSES, Task} from './tasks/task';
import {TaskService} from './tasks/task.service';
import {map, mergeMap, take} from 'rxjs/operators';

@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  tasks$: Observable<Task[]>;

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  ngOnInit(): void {
    this.tasks$ = this.taskService.getAll();
  }

  created(): void {
    this.tasks$ = this.taskService.getAll();
  }

  deleted(): void {
    this.tasks$ = this.taskService.getAll();
  }

  statusChanged(): void {
    this.tasks$ = this.taskService.getAll();
  }

  clearFinishedTasks(): void {
    this.tasks$ = this.taskService.getAll();
  }
}
