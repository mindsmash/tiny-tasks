import {ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output} from '@angular/core';

import {FINISHED_TASK_STATUSES, Task, TaskStatus} from '../task';
import {TaskService} from '../task.service';
import {listAnimation, listItemAnimation} from "app/tasks/task-list/task-list.animation";

/**
 * A list of tiny tasks.
 */
@Component({
  selector: 'tiny-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    listAnimation,
    listItemAnimation
  ]
})
export class TaskListComponent {

  @Input() public readonly tasks: ReadonlyArray<Task> = [];

  @Output() public readonly deleted: EventEmitter<Task> = new EventEmitter();
  @Output() public readonly statusChanged: EventEmitter<Task> = new EventEmitter();

  public taskStatus: typeof TaskStatus = TaskStatus;

  constructor(
    @Inject('TaskService') private taskService: TaskService
  ) { }

  public trackByTaskId(_: any, task: Task): string {
    return task.id;
  }

  public delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  public changeStatus(id: string, status: TaskStatus): void {
    this.taskService.setStatus(id, status).subscribe((updatedTask: Task) => {
      this.statusChanged.emit(updatedTask);
    });
  }

  public isTaskFinished(task: Task): boolean {
    return FINISHED_TASK_STATUSES.includes(task.status);
  }
}
