import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

/**
 * A list of done tasks.
 */
@Component({
  selector: 'done-task-list',
  templateUrl: './done-list.component.html',
  styleUrls: ['./done-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DoneListComponent {
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
   * Creates an instance of DoneListComponent.
   * @param taskService {TaskService}
   * @memberof DoneListComponent
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

      })
    }
  }

}
