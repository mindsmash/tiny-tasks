import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Task } from './tasks/task';
import { TaskService } from './tasks/task.service';

@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  now$: Observable<Date>;

  tasksNotDone$: Observable<Task[]>;

  tasksDone$: Observable<Task[]>;

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  ngOnInit(): void {
    this.now$ = timer((60 - new Date().getSeconds()) * 1000, 60 * 1000)
      .pipe(startWith(0))
      .pipe(map(() => new Date()));
    this._getTasks();
  }

  getTasks(): void {
    this._getTasks();
  }

  private _getTasks() {
    this.tasksNotDone$ = this.taskService.getTasksNotDone();
    this.tasksDone$ = this.taskService.getTasksDone();
  }
}
