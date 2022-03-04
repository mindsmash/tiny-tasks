import {ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output} from '@angular/core';

import {Task} from '../task';
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

  @Input() tasks: Task[] | null = null;

  @Output() deleted: EventEmitter<Task> = new EventEmitter();

  @Output() done: EventEmitter<Task> = new EventEmitter();

  constructor(@Inject('TaskService') private taskService: TaskService) {
  }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  markAsDone(task: Task) {
    if (!task.isDone) {
      this.taskService.markAsDone(task.id).subscribe(taskDone => {
        this.done.emit(taskDone);
      })
    }
  }

  getName(isDone?: boolean) {
    return isDone ? "check_circle" : "check_circle_outline"
  }
}
