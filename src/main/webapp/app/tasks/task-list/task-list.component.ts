import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

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
  
  @Output() ontoggleiscompleted: EventEmitter<Task> = new EventEmitter();
  
  @Output() ondeletecompletetasks: EventEmitter<void> = new EventEmitter();

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  ngOnChanges(changes: SimpleChanges) {
    this.tasks = changes['tasks'].currentValue.sort((a, b) => a.isCompleted ? 1 : -1)
  }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  deleteCompleteTasks(): void {
    this.taskService.deleteCompleteTasks().subscribe(() => {
      this.ondeletecompletetasks.emit();
    });
  }

  toggleIsCompleted(event:MatCheckboxChange, task: Task): void {
    this.taskService.toggleIsCompleted(task.id).subscribe(() => {
      this.ontoggleiscompleted.emit(task);
    });
  }
}
