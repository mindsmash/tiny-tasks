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

  @Input()
  get doneTasks(): Task[] {
    return this.tasks.filter(task => task.status === 'Done');
  }

  @Input()
  get todoTasks(): Task[] {
    return this.tasks.filter(task => task.status === 'Todo');
  }

  @Output() deleted: EventEmitter<Task> = new EventEmitter();

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  changeStatus(task: Task): void {
    this.taskService.changeStatus(task.id, task.status).subscribe(() => {
      this.deleted.emit(task);
    });
  }
}
