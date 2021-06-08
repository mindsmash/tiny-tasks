import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';

import { Task } from '../task';
import { TaskService } from '../task.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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

  taskSearch: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(@Inject('TaskService') private taskService: TaskService) {}

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  resetSearch(): void {
    this.taskSearch.reset();
}
}
