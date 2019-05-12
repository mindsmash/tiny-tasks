import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material';
import * as moment from 'moment';
import { Moment } from 'moment';

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
  @Output() updated: EventEmitter<Task> = new EventEmitter();

  constructor(@Inject('TaskService') private taskService: TaskService) {
  }

  get scheduledTasks(): Task[] {
    if (!this.tasks) {
      return [];
    }

    return this.tasks
      .filter(task => task.due)
      .sort((a, b) => a.due.diff(b.due));
  }

  get unscheduledTasks(): Task[] {
    if (!this.tasks) {
      return [];
    }

    return this.tasks.filter(task => !task.due);
  }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  changeDueDate(task: Task, event: MatDatepickerInputEvent<Moment>): void {
    task.due = event.value;

    this.taskService.update(task).subscribe(() => {
      this.updated.emit(task);
    });
  }

  changeDueTime(task: Task, event: Event): void {
    const target = event.target as HTMLInputElement;
    const time = moment.duration(target.valueAsNumber);
    task.due = task.due.startOf('day').add(time);

    this.taskService.update(task).subscribe(() => {
      this.updated.emit(task);
    });
  }

  isOverdue(task: Task): boolean {
    if (!task.due) {
      return false;
    }

    return task.due.isBefore(moment());
  }
}
