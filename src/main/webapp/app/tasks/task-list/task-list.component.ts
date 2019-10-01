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
  @Output() done: EventEmitter<Task> = new EventEmitter();
  @Output() cleared: EventEmitter<Task> = new EventEmitter();

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }
  doneTask(task: Task): void {
    this.taskService.done(task.id).subscribe(() => {
      this.done.emit(task);
    });
  }
  clearDoneTasks(): void {
    this.taskService.clear().subscribe(() => {
      this.cleared.emit();
    });
  }
  showClearButton(): boolean {
    const inCompleteTasks = this.tasks.filter(task => task.isComplete === true);
    if (inCompleteTasks.length) {
      return true;
    } else {
      return false;
    }
  }
}
