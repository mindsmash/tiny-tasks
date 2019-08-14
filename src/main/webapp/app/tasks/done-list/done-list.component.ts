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
  public done;
  @Input() tasks: Task[];

  @Output() deleted: EventEmitter<Task> = new EventEmitter();

  @Output() checked: EventEmitter<Task> = new EventEmitter();

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }
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
