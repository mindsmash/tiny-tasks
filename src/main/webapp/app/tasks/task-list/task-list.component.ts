import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';

import { Task, Status } from '../task';
import { TaskService } from '../task.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
export interface TaskStatus {
  value: number;
  viewValue: string;
}
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
  /**
 * list of tasks
 */
  @Input() tasks: Task[];
  /**
   * deleted event emmited when delete icon is clicked
   */
  @Output() deleted: EventEmitter<Task> = new EventEmitter();
  /**
   * checked event emmited when task is marked as done
   */
  @Output() checked: EventEmitter<Task> = new EventEmitter();
  /**
   * statusChange event emmited when task status is changed
   */
  @Output() statusChange: EventEmitter<Task> = new EventEmitter();
  /**
   * taskStatus with the view values of None, In Progress, Blocked
   */
  taskStatus: TaskStatus[] = [
    { value: Status.none, viewValue: 'None' },
    { value: Status.inProgress, viewValue: 'In Progress' },
    { value: Status.blocked, viewValue: 'Blocked' }
  ];
  /**
   * Creates an instance of TaskListComponent.
   * @param taskService {TaskService}
   * @memberof TaskListComponent
   */
  constructor(@Inject('TaskService') private taskService: TaskService) { }
  /**
   * delete function calls delete from service and emits deleted event
   * @param task {Task}
   */
  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }
  /**
   * toggle function calls marksAsDone from service and emits checked event
   * @param task {Task}
   */
  toggle(task: Task): void {
    this.taskService.markAsDone(task.id).subscribe(() => {
      this.checked.emit(task);
    });
  }
  /**
   * update function calls update from service and emits statusChange event
   * @param task {Task}
   */
  update(task: Task): void {
    this.taskService.update(task).subscribe(() => {
      this.statusChange.emit(task);
    });
  }
  /**
   * drop function checks if item is dragged and dropped in the same list or not
   * if it's in the same list, it will remain as it is
   * else, it will toggle the checked property in this item and move it to the other list & emits the checked event
   * @param event {CdkDragDrop<string[]>}
   */
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const currentTask: any = event.previousContainer.data[event.previousIndex];
      this.taskService.markAsDone(currentTask.id).subscribe(() => {
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
        this.checked.emit(currentTask);
      });
    }
  }
}
