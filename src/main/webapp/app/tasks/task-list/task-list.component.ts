import {ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output} from '@angular/core';

import {Task, TaskStatus} from '../task';
import {TaskService} from '../task.service';

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

  @Input() public readonly tasks: Task[];

  @Output() public readonly deleted: EventEmitter<Task> = new EventEmitter();
  @Output() public readonly statusChanged: EventEmitter<Task> = new EventEmitter();

  constructor(
    @Inject('TaskService') private taskService: TaskService
  ) { }

  public trackByTaskId(_, task: Task): string {
    return task.id;
  }

  public delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  public markAsDone(task: Task): void {
    this.taskService.setStatus(task.id, TaskStatus.Done).subscribe((updatedTask: Task) => {
      this.statusChanged.emit(updatedTask);
    });
  }

  public isTaskDone(task: Task): boolean {
    return task.status === TaskStatus.Done;
  }
}
