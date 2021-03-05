import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';

import { Task } from '../task';
import { TaskService } from '../task.service';
import { TaskStatus } from '../taskstatus';

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
    return this.tasks.filter(task => task.done);
  }

  @Input()
  get pendingTasks(): Task[] {
    return this.tasks.filter(task => !(task.done));
  }

  @Output() deleted: EventEmitter<Task> = new EventEmitter();

  @Output() clearCompleted: EventEmitter<Task> = new EventEmitter();

  taskStatus: TaskStatus[] = [{ type: 'pending', name: 'Pending' }, { type: 'inProgress', name: 'In Progress' }, { type: 'blocked', name: 'Blocked' }, { type: 'done', name: 'Done' }];

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
