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
  
  @Output() ontoggledone: EventEmitter<Task> = new EventEmitter();
  
  @Output() ondeletedonetasks: EventEmitter<void> = new EventEmitter();

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['tasks'].currentValue) {
      this.tasks.sort((a, b) => a.done ? 1 : -1)
    }
  }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  deleteDoneTasks(): void {
    this.taskService.deleteDoneTasks().subscribe(() => {
      this.ondeletedonetasks.emit();
    });
  }

  toggleDone(event:MatCheckboxChange, task: Task): void {
    this.taskService.toggleDone(task.id).subscribe(() => {
      this.ontoggledone.emit(task);
    });
  }
}
