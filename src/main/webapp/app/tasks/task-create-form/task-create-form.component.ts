import {ChangeDetectionStrategy, Component, EventEmitter, Inject, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

import {Task} from '../shared/task';
import {TaskService} from '../shared/task.service';

/**
 * A form to create tiny tasks.
 */
@Component({
  selector: 'tiny-task-create-form',
  templateUrl: './task-create-form.component.html',
  styleUrls: ['./task-create-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCreateFormComponent {

  @Output() created: EventEmitter<Task> = new EventEmitter();

  taskForm: FormGroup = new FormGroup({
    name: new FormControl('')
  });

  constructor(@Inject('TaskService') private taskService: TaskService) {
  }

  onSubmit(): void {
    if (this.taskForm.value.name) {
      this.taskService.create(this.taskForm.value.name).subscribe(task => {
        this.created.emit(task);
        this.taskForm.reset();
      });
    }
  }
}
