import { CdkDragDrop } from '@angular/cdk/drag-drop';
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

  @Input() tasksNotDone: Task[] = [];

  @Input() tasksDone: Task[] = [];

  @Output() updated: EventEmitter<void> = new EventEmitter();

  @Output() deleted: EventEmitter<void> = new EventEmitter();

  @Output() deletedAll: EventEmitter<void> = new EventEmitter();

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  drop(event: CdkDragDrop<Task[]>) {
    const movingToTasksNotDoneList = event.container.element.nativeElement.id === 'tasksNotDoneList';

    if (movingToTasksNotDoneList) {
      this.setTaskNotDone(event.item.data, event.currentIndex);
    } else {
      // movingToTasksDoneList
      this.setTaskDone(event.item.data, event.currentIndex);
    }
  }

  setDone(task: Task) {
    if (task.done) {
      this.setTaskDone(task);
    } else {
      this.setTaskNotDone(task);
    }
  }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit();
    });
  }

  deleteAllDone(): void {
    this.taskService.deleteAllDone().subscribe(() => {
      this.deletedAll.emit();
    });
  }

  private setTaskNotDone(task: Task, index: number = 0) {
    const taskIsNotDone = this.tasksNotDone.indexOf(task) > -1;

    if (taskIsNotDone) {
      // Remove from older position and insert it in new position
      this.tasksNotDone.splice(this.tasksNotDone.indexOf(task), 1);
      this.tasksNotDone.splice(index, 0, task);
    } else {
      // Remove from tasks done list
      this.tasksDone.splice(this.tasksDone.indexOf(task), 1);

      // Update done and add to tasks not done list
      task.done = false;
      this.tasksNotDone.splice(index, 0, task);
    }
    this.update([...this.tasksNotDone, ...this.tasksDone]);
  }

  private setTaskDone(task: Task, index: number = 0) {
    const taskIsDone = this.tasksDone.indexOf(task) > -1;

    if (taskIsDone) {
      // Remove from older position and insert it in new position
      this.tasksDone.splice(this.tasksDone.indexOf(task), 1);
      this.tasksDone.splice(index, 0, task);
    } else {
      // Remove from tasks not done list
      this.tasksNotDone.splice(this.tasksNotDone.indexOf(task), 1);

      // Update done and add to tasks not done list
      task.done = true;
      this.tasksDone.splice(index, 0, task);
    }
    this.update([...this.tasksNotDone, ...this.tasksDone]);
  }

  private update(tasks: Task[]): void {
    this.taskService.update(tasks).subscribe(() => {
      this.updated.emit();
    });
  }
}
