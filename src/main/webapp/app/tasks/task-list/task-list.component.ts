import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

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

  @Input() tasks: Task[] | null = null;

  @Output() loadTasks: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    @Inject('TaskService') private taskService: TaskService
  ) { }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.loadTasks.emit();
    });
  }

  onSetTaskDueDate(event: MatDatepickerInputEvent<Date>, task: Task): void {
    this.taskService.saveTaskData({ ...task, dueDate: event.value }).subscribe({
      next: () => { this.loadTasks.emit(); }
    });
  }
}
