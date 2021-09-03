import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Task } from './tasks/task';
import { TaskService } from './tasks/task.service';

@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  tasks$: Observable<Task[]>;

  constructor(@Inject('TaskService') private taskService: TaskService) {
    this.tasks$ = this.taskService.getAll();
  }

  ngOnInit(): void {
    this.tasks$ = this.taskService.getAll();
  }

  created(): void {
    this.tasks$ = this.taskService.getAll();
  }

  deleted(): void {
    this.tasks$ = this.taskService.getAll();
  }

  completed(): void {
    this.tasks$ = this.taskService.getAll();
  }

  async clearCompleted(): Promise<void> {
    const completedTasks = (await this.tasks$.toPromise()).filter((item) => item.completed);
    await this.taskService.clearCompleted(completedTasks).toPromise();
    this.tasks$ = this.taskService.getAll();
  }
}
