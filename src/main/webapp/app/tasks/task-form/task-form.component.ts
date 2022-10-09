import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Output,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent {
  @Output() public created: EventEmitter<Task> = new EventEmitter();

  public taskForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  public constructor(@Inject('TaskService') private taskService: TaskService) {}

  public onSubmit(): void {
    if (this.taskForm.value.name) {
      this.taskService.create(this.taskForm.value.name).subscribe((task) => {
        this.created.emit(task);
        this.taskForm.reset();
      });
    }
  }
}
