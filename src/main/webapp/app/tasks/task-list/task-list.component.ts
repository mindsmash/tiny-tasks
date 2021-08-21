import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

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

  @Output() done: EventEmitter<Task> = new EventEmitter();

  @Output() emptyDone: EventEmitter<void> = new EventEmitter();

  hasDoneTasks: boolean;

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tasks) {
      this.hasDoneTasks = !!this.tasks.filter(task => task.done).length;
    }
  }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  setDone(task: Task): void {
    this.taskService.setDone(task.id).subscribe(() => {
      this.done.emit(task);
    });
  }

  emptyDoneList(): void {
    this.taskService.emptyDoneList().subscribe(() => {
      this.emptyDone.emit();
    });
  }
}
