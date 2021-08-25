import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';

import { Task, TaskStatus } from '../task';
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
  @Output() statusChanged: EventEmitter<Task> = new EventEmitter();
  @Output() doneTaskCleared: EventEmitter<Task> = new EventEmitter();

  status: typeof TaskStatus = TaskStatus;
  sortedByDoneStatus: boolean = false;

  constructor(@Inject('TaskService') private taskService: TaskService) {}

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  changeStatus(task: Task, status: TaskStatus): void {
    this.taskService.updateStatus(task.id, status).subscribe((updatedTask: Task) => {
      this.statusChanged.emit(updatedTask);
    });
  }

  showOption(task: Task, status: TaskStatus): boolean {
    return task.status != status
  }

  sortTasks() {
    const doneItems = [...this.tasks.filter(task => task.status === TaskStatus.Done)];
    const restItems = [...this.tasks.filter(task => task.status !== TaskStatus.Done)];

    this.tasks = this.sortedByDoneStatus ? [...restItems, ...doneItems] : [...doneItems, ...restItems];
    this.sortedByDoneStatus = !this.sortedByDoneStatus;
  }

  clearDoneTasks() {
    this.taskService.clearDoneTasks().subscribe((updatedTask: Task) => {
      this.doneTaskCleared.emit(updatedTask);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }
}
