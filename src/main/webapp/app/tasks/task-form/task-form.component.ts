import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Task } from '../task';
import { TaskService } from '../task.service';

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

  @Output() created: EventEmitter<Task> = new EventEmitter();

  taskForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    date: new FormControl('', Validators.nullValidator),
  });

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  onSubmit(): void {
    this.taskForm.valid && this.taskService.create(this.taskForm.value).subscribe(task => {
      this.created.emit(task);
      this.taskForm.reset();
    });
  }
}
