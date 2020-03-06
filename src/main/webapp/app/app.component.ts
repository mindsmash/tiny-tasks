import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {Observable, Subject, timer} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import {Task} from './tasks/task';
import {TaskService} from './tasks/task.service';
import {isNull} from "util";

@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  now$: Observable<Date>;

  tasks$: Observable<Task[]>;
  private searchTerms = new Subject<string>();


  constructor(@Inject('TaskService') private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.now$ = timer((60 - new Date().getSeconds()) * 1000, 60 * 1000)
      .pipe(startWith(0))
      .pipe(map(() => new Date()));
    this.tasks$ = this.taskService.getAll();
  }

  created(): void {
    this.tasks$ = this.taskService.getAll();
  }

  deleted(): void {
    this.tasks$ = this.taskService.getAll();
  }

  searchTask(query) {
    if (query && query.trim() != '') {
      this.tasks$ = this.taskService.searchTasks(query.trim());
    } else {
      this.tasks$ = this.taskService.getAll();
    }
  }
}
