import { ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { Task } from '../../../interfaces/task';
import {
  AuthService,
  TaskService,
} from '../../../services';

/**
 * A list of tiny tasks.
 */
@Component({
  selector: 'tiny-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks$: Observable<Task[]>;

  @Input() tasks: Task[];

  private userId: string;
  private reloadTasksSubscription: Subscription;

  constructor(
    @Inject('TaskService') private taskService: TaskService,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.userId = this.authService.getTokenValue('uuid');
    this.tasks$ = this.taskService.getAll(this.userId);

    this.reloadTasksSubscription = this.taskService.reloadTasks$.subscribe(() => {
      this.tasks$ = this.taskService.getAll(this.userId);
    });
  }

  ngOnDestroy() {
    if (this.reloadTasksSubscription) {
      this.reloadTasksSubscription.unsubscribe();
    }
  }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.tasks$ = this.taskService.getAll(this.userId);
      this.cdRef.detectChanges();
    });
  }
}
