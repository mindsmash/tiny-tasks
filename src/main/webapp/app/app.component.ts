import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, switchMap } from 'rxjs';

import { Task } from './tasks/task';
import { TaskService } from './tasks/task.service';

@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  private fetch: Subject<void> = new BehaviorSubject<void>(void 0);
  tasks$: Observable<Task[]>;

  constructor(@Inject('TaskService') private taskService: TaskService) {
    this.tasks$ = this.fetch.pipe(switchMap(() => this.taskService.getAll()));
  }

  ngOnInit(): void {
    this.fetch.next();
  }

  created(): void {
    this.fetch.next();
  }

  deleted(): void {
    this.fetch.next();
  }

  updated(): void {
    this.fetch.next();
  }
}
