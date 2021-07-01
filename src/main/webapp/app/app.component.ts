import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {forkJoin, Observable} from 'rxjs';

import {Task, TaskStatus} from './tasks/task';
import {TaskService} from './tasks/task.service';
import {map, mergeMap, take} from "rxjs/operators";

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

  clearDoneTasks(): void {
    this.tasks$.pipe(
      take(1),
      map((tasks: Task[]) => tasks.filter((task: Task) => task.status === TaskStatus.Done)),
      mergeMap((tasks: Task[]) => forkJoin(...tasks.map((task: Task) => this.taskService.delete(task.id))))
    ).subscribe(() => {
      this.tasks$ = this.taskService.getAll();
    });
  }
}
