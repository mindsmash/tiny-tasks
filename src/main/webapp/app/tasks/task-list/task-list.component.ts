import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';

import { ALL_STATUSES, Status, Task } from '../task';
import { TaskService } from '../task.service';
import { TaskStore } from '../task.store';

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
  ALL_STATUSES = ALL_STATUSES;
  constructor(@Inject('TaskService') private taskService: TaskService, private taskStore: TaskStore) {}

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.taskStore.delete(task.id);
    });
  }

  setStatus(task: Task, status: Status) {
    this.taskService.update({...task, status}).subscribe(updatedTask => {
      this.taskStore.update(updatedTask);
    });
  }

  clearDoneTasks() {
    this.tasks?.forEach(task => {
      if (task.status === 'Done') {
        this.delete(task);
      }
    })
  }

  drop(event: CdkDragDrop<Task[]>, status: Status) {
    if (event.previousContainer !== event.container) {
      this.setStatus(event.item.data, status)
    }
  }
}
