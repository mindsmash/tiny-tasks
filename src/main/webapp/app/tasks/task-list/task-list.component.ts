import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';

import { Task } from '../task';
import { TaskService } from '../task.service';

/**
 * A list of tiny tasks.
 */
@Component({
  selector: 'tiny-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {

  @Input() tasks: Task[] | null = null;

  @Output() deleted: EventEmitter<Task> = new EventEmitter();
  @Output() completionToggled: EventEmitter<Task> = new EventEmitter();
  @Output() tasksCleared: EventEmitter<void> = new EventEmitter();

  constructor(@Inject('TaskService') private taskService: TaskService) {}

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  toggleCompletion(task: Task): void {
    this.taskService.toggleCompletion(task).subscribe(() => {
      this.completionToggled.emit(task);
    })
  }

  clearTasks(): void {
    this.taskService.clearCompletedTasks().subscribe(() => {
      this.tasksCleared.emit();
    });
  }
}
