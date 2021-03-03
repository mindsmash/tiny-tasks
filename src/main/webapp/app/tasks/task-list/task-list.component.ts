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

  @Input() tasks: Task[];

  @Input()
  get completedTasks(): Task[] {
    return this.tasks.filter(task => task.status === 'done');
  }

  @Input()
  get pendingTasks(): Task[] {
    return this.tasks.filter(task => task.status !== 'done');
  }

  @Output() deleted: EventEmitter<Task> = new EventEmitter();

  @Output() clearCompleted: EventEmitter<Task> = new EventEmitter();

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  updateStatus(task: Task, status) {
    this.taskService.updateStatus(task.id, status).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  clearCompletedTasks(): void {
    this.taskService.clearCompletedTasks().subscribe(() => {
      this.clearCompleted.emit();
    });
  }
}
