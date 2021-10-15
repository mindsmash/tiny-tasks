import {ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output} from '@angular/core';

import {Task, TaskStatus} from '../task';
import {TaskService} from '../task.service';
import {CdkDragDrop, transferArrayItem} from "@angular/cdk/drag-drop";

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

  private _tasks: Task[] | null = null;
  tasksReady: Task[] | null = null;
  tasksInProgress: Task[] | null = null;
  tasksSuspended: Task[] | null = null;
  tasksDone: Task[] | null = null;

  @Input()
  set tasks(value: Task[] | null) {
    this._tasks = value;
    this.tasksReady = this.filterByTaskStatus(this._tasks, 'ReadyForDev');
    this.tasksInProgress = this.filterByTaskStatus(this._tasks, 'InProgress');
    this.tasksSuspended = this.filterByTaskStatus(this._tasks, 'Suspended');
    this.tasksDone = this.filterByTaskStatus(this._tasks, 'DevDone');
  };

  @Output() deleted: EventEmitter<Task> = new EventEmitter();

  @Output() done: EventEmitter<Task> = new EventEmitter();

  constructor(@Inject('TaskService') private taskService: TaskService) {
  }

  private filterByTaskStatus(list: Task[] | null, status: TaskStatus): Task[] {
    if (!Array.isArray(list)) {
      return [];
    }
    return list.filter((item: Task) => item.status === status);
  }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  updateTaskStatus(task: Task, newStatus: TaskStatus) {
    this.taskService.updateStatus(task.id, newStatus).subscribe(() => {
      this.done.emit(task);
    });
  }

  drop(event: CdkDragDrop<Task[] | null>) {
    if (
      event.previousContainer !== event.container
      && event.container.data
      && event.previousContainer.data && event.container.data) {
      let newStatus: TaskStatus = 'ReadyForDev';
      switch (event.container.id) {
        case 'tasks-ready-list':
          newStatus = 'ReadyForDev';
          break;
        case 'tasks-in-progress-list':
          newStatus = 'InProgress';
          break;
        case 'tasks-suspended-list':
          newStatus = 'Suspended';
          break;
        case 'tasks-done-list':
          newStatus = 'DevDone';
          break;
      }
      this.updateTaskStatus(event.previousContainer.data[event.previousIndex], newStatus);
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
