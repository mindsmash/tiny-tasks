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

  @Output() deleted: EventEmitter<Task> = new EventEmitter();
  @Output() toggledDoneStatus: EventEmitter<Task> = new EventEmitter();

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  toggleDoneStatus(task: Task): void {
    task.isDone = !task.isDone;
    this.taskService.setDoneStatus(task).subscribe(() => {
      this.toggledDoneStatus.emit(task);
    });
  }

  deleteAllDoneTasks(): void {
    this.tasks
      .filter((task) => task.isDone)
      .forEach((task) => this.delete(task));
  }
}
