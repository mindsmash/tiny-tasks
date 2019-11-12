import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output, OnChanges } from '@angular/core';

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

  @Input() taskFilter: Function;

  @Output() shownTasks: Task[];

  @Output() deleted: EventEmitter<Task> = new EventEmitter();

  @Output() patched: EventEmitter<Task> = new EventEmitter();

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  ngOnChanges(): void {
    if(this.tasks) {
      if(this.taskFilter){
        this.shownTasks = this.taskFilter(this.tasks);
      } else {
        this.shownTasks = this.tasks;
      }
    }
  }

  toggleDone(task: Task): void {
    this.taskService.toggleDone(task.id, !task.done).subscribe( (task) => {
      this.patched.emit(task);
    });
  }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }
}
