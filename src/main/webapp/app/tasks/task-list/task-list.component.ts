import { ChangeDetectionStrategy, Component, OnChanges, EventEmitter, Inject, Input, Output } from '@angular/core';

import { Task, TaskStatus } from '../task';
import { TaskService } from '../task.service';
import { SelectDatum } from '../task-select-status/task-select-status.component';

export const TaskStatusToCssMapping = new Map<string, string>([
  ['blocked', 'is-blocked'],
  ['default', ''],
  ['done', 'is-marked'],
  ['progress', 'is-progress'],
]);

/**
 * A list of tiny tasks.
 */
@Component({
  selector: 'tiny-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnChanges {

  @Input() tasks: Task[] | null = null;

  @Output() deleted: EventEmitter<Task> = new EventEmitter();
  @Output() updated: EventEmitter<Task> = new EventEmitter();

  public sortedTasks: Array<Task> = [];

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  ngOnChanges(): void {
    this.setSortedTasks();
  }

  /**
   * Set the sorted tasks
   */
  setSortedTasks(): void {
    this.sortedTasks = this.getSortedTasks();
  }

  /**
   * Resolves a list of sorted tasks by isMarked status
   */
  getSortedTasks(): Array<Task> {
    return (this.tasks || []).sort((a, _b) => {
      if (a.isMarked) { return 1; }
      return -1;
    });
  }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  /**
   * Event handler for marking a task as done
   */
  onMarkAsDone(task: Task): void {
    task.isMarked = true;
    this.taskService.update(task).subscribe(() => {
      this.updated.emit(task);
    });
    this.setSortedTasks();
  }

  /**
   * Event handler for update of task
   */
  onUpdate(selection: SelectDatum, task: Task): void {
    task.status = selection.value;
    task.ui.styleStatus = TaskStatusToCssMapping.get(task.status);
    if (task.status === TaskStatus.DONE) { task.isMarked = true; }
    this.taskService.update(task).subscribe(() => {
      this.updated.emit(task);
    });
    this.setSortedTasks();
  }
}
