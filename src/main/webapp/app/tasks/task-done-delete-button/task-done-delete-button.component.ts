import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';

import { Task } from '../task';
import { TaskService } from '../task.service';

/**
 * A button to delete all done tasks
 */
@Component({
  selector: 'tiny-task-done-delete-button',
  templateUrl: './task-done-delete-button.component.html',
  styleUrls: ['./task-done-delete-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDoneDeleteButtonComponent {

  @Output() multipleDeleted: EventEmitter<Task[]> = new EventEmitter();

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  deleteAllDoneTasks(): void {
    this.taskService.getAll().subscribe(tasks => {
      if (tasks) {
        const allDoneTasks = tasks.filter(task => task.done);
        if (allDoneTasks) {
          this.taskService.deleteMultiple(allDoneTasks).subscribe(() => {
            this.multipleDeleted.emit(allDoneTasks);
          });
        }
      }
    });
  }
}
