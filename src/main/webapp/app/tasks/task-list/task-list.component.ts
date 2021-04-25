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

  @Output() togglecompleted: EventEmitter<Task> = new EventEmitter();

  @Output() clearcompleted: EventEmitter<Task> = new EventEmitter();

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }
  togglecomplete(task: Task) {
    this.taskService.togglecomplete(task.id).subscribe(() => {
      this.togglecompleted.emit(task);
    });
  }
  clearcomplete() {
    this.taskService.clearcomplete().subscribe(() => {
      this.clearcompleted.emit();
    });
  }
}
