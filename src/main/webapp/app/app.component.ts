import { ChangeDetectionStrategy, Component, Inject, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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

  tasks$: Observable<Task[]>;

  filteredTasks: Task[];

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  ngOnInit(): void {
    this.now$ = timer((60 - new Date().getSeconds()) * 1000, 60 * 1000)
      .pipe(startWith(0))
      .pipe(map(() => new Date()));
      this.refresh();
  }

  created(): void {
    this.refresh();
  }

  deleted(): void {
    this.refresh();
  }

  getFilteredTasks(tasks: Task[]): void {
    this.filteredTasks = tasks;
  }

  refresh(): void {
    this.tasks$ = this.taskService.getAll();
    this.tasks$.subscribe( tasks => {
      this.filteredTasks = tasks;
    },
    error => {
      // TODO: handle error message
    });
  }

}
