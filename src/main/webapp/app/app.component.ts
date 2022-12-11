import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Task } from './tasks/task';
import { TaskStore } from './tasks/task.store';

@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  tasks$: Observable<Task[]>;

  constructor(private taskStore: TaskStore) {
    this.tasks$ = this.taskStore.tasks$.pipe(
      map(tasks => {
        const doneTasks = tasks.filter(task => task.status === 'Done');
        return tasks.filter(task => task.status !== 'Done').concat(doneTasks);
      }),
    );
  }
}
