import { ChangeDetectionStrategy, Component, Inject, Input, Output, EventEmitter } from '@angular/core';

import { Task } from '../task';
import { TaskService } from '../task.service';

/**
 * A form to create tiny tasks.
 */
@Component({
  selector: 'tiny-task-clear',
  templateUrl: './task-clear.component.html',
  styleUrls: ['./task-clear.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskClearComponent {
  @Input() tasks: Task[] | null = null;

  @Output() deleted: EventEmitter<Task> = new EventEmitter();

  constructor(
    @Inject('TaskService') private taskService: TaskService,
  ) { }

  get tasksMarked(): Array<Task> { return this.getTasksMarked(); }

  /**
   * Resolves a list of tasks that are marked
   */
  getTasksMarked(): Array<Task> {
    return (this.tasks || []).filter((task) => task.isMarked);
  }

  /**
   * Event handler for clearing all marked tasks
   */
  onClear(): void {
    const markedTasks = this.getTasksMarked();
    if (!markedTasks.length) { return; }
    markedTasks.forEach((task) => this.onDelete(task));
  }

  /**
   * Event handler for deleting a task
   */
  onDelete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }
}
