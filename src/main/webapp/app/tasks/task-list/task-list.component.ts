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

  @Input() tasks: Task[];

  @Output() deleted: EventEmitter<Task> = new EventEmitter();
  @Output() updated: EventEmitter<Task> = new EventEmitter();

  constructor(@Inject('TaskService') private taskService: TaskService) {
  }

  toggleDone(task: Task): void {
    task.done = !task.done;
    this.update(task);
  }

  update(task: Task): void {
    this.taskService.update(task.id, task).subscribe(() => {
      this.updated.emit(task);
    });
  }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }
}
