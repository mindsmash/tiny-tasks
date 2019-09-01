import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnChanges, Output } from '@angular/core';

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
export class TaskListComponent implements OnChanges {

  @Input() tasks: Task[];

  @Output() deleted: EventEmitter<Task> = new EventEmitter();

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  ngOnChanges() {
    this.setDateAccordingToLocalTimeZone();
  }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  private setDateAccordingToLocalTimeZone() {
    if (this.tasks) {
      this.tasks.forEach(task => {
        if (task.dueDate) {
          const tzDifference = -new Date().getTimezoneOffset();
          task.dueDate = new Date(new Date(task.dueDate).getTime() + tzDifference * 60 * 1000);
        }
      });
    }
  }

}
