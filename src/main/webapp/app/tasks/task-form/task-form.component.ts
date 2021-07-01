import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {FINISHED_TASK_STATUSES, Task} from '../task';
import { TaskService } from '../task.service';
import {map, mergeMap, take, tap} from "rxjs/operators";

/**
 * A form to create tiny tasks.
 */
@Component({
  selector: 'tiny-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFormComponent {

  @Output() public readonly created: EventEmitter<Task> = new EventEmitter();
  @Output() public readonly clearDoneTasks: EventEmitter<void> = new EventEmitter();

  taskForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  onSubmit(): void {
    this.taskService.create(this.taskForm.value.name).subscribe(task => {
      this.created.emit(task);
      this.taskForm.reset();
    });
  }

  onClearFinishedTasks(): void {
    this.taskService.getAll().pipe(
      take(1),
      map((tasks: Task[]) => tasks
        .filter((task: Task) => FINISHED_TASK_STATUSES.includes(task.status))
        .map(({id}: Task) => id)
      ),
      mergeMap((taskIds: string[]) => this.taskService.deleteAll(taskIds))
    ).subscribe(() => {
      this.clearDoneTasks.emit();
    });
  }
}
