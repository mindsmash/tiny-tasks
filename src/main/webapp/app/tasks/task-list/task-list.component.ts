import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';

/**
 * A list of tiny tasks.
 */
@Component({
  selector: 'tiny-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnChanges {
  doneTaskLength: number;

  @Input() tasks: Task[];

  @Output() deleted: EventEmitter<Task> = new EventEmitter();

  @Output() toggledDone: EventEmitter<Task> = new EventEmitter();

  @Output() clearedDoneTasks: EventEmitter<Task> = new EventEmitter();

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  ngOnChanges() {
    this.tasks.sort(task => task.isDone ? 1 : -1);
    this.doneTaskLength = this.tasks.filter(task => task.isDone).length;
  }

  toggleDone(task: Task): void {
    this.taskService.toggleDone(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  clearDoneTasks(): void {
    this.taskService.clearDoneTasks().subscribe(() => {
      this.clearedDoneTasks.emit();
    });
  }
}
