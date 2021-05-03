import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Task } from '../task';
import { TaskService } from '../task.service';

/**
 * A list of tiny tasks.
 * @UntilDestroy() : A neat way to unsubscribe from observables when the component destroyed
 */
@UntilDestroy()
@Component({
  selector: 'tiny-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {

  @Input() tasks: Task[];

  @Output() deleted: EventEmitter<Task> = new EventEmitter();

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  update(task: Task): void {
    this.taskService.update(task.id, task)
      // This is a great method to unsubscribe from observable when it destoyed
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.sortPendingTasks(this.tasks)
    });
  }
  
  delete(task: Task): void {
    this.taskService.delete(task.id)
      // This is a great method to unsubscribe from observable when it destoyed
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.deleted.emit(task);
    });
  }

  clearCompletedTasks(tasks: Task[]): void {
    // Optimistic approach
    const currentTasks = tasks.filter( task => task.isCompleted === false );
    this.tasks = currentTasks;
    // updating the local storage
    this.taskService.clearCompletedTasks(currentTasks);
  }

  /**
   * @param tasks the tasks
   * sorting the tasks, pending one will be at the top and rest will be in the bottom
   * checking the boolean value here
   */
  sortPendingTasks(tasks): void {
    tasks.sort(task => task.isCompleted ? 1 : -1)
  }
}
