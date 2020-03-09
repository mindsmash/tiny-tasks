import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnChanges, Output } from '@angular/core';
import { Task, TaskStatus } from '../task';
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
export class TaskListComponent implements OnChanges {

  @Input() tasks: Task[];

  @Input() hideCompleted: boolean;

  @Output() deleted: EventEmitter<Task> = new EventEmitter();

  @Output() updated: EventEmitter<Task> = new EventEmitter();

  private displayedTasks: Task[];

  constructor(@Inject('TaskService') private taskService: TaskService) {
  }

  ngOnChanges(): void {
    this.initTasks();
    if (this.hideCompleted) {
      this.hideCompletedTasks();
    } else {
      this.initTasks();
    }
  }

  initTasks() {
    if (!this.tasks) {
      return;
    }
    this.displayedTasks = [...this.tasks];
    this.sortTasks();
  }

  hideCompletedTasks(): void {
    // @ts-ignore
    // (had an issue because sorting only works with enum int values but filtering only if enum has string values)
    this.displayedTasks = this.displayedTasks.filter(task => task.taskStatus !== TaskStatus[TaskStatus.DONE]);
  }

  sortTasks(): void {
    this.displayedTasks = this.displayedTasks.sort((a, b) => {
      if (a.taskStatus === null) { return -1; }
      if (b.taskStatus === null) { return -1; }
      if (TaskStatus[a.taskStatus] < TaskStatus[b.taskStatus]) { return -1; }
      if (TaskStatus[a.taskStatus] > TaskStatus[b.taskStatus]) { return 1; }
      return 0;
    });
  }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  updateTaskStatus(task: Task): void {
    this.taskService.update(task).subscribe((updatedTask: Task) => {
      this.updated.emit(updatedTask);
    });
  }
}


