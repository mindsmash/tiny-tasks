import {ChangeDetectionStrategy, Component, EventEmitter, Inject, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {Task} from '../task';
import {TaskService} from '../task.service';

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
  startDate = new Date();
  @Output() created: EventEmitter<Task> = new EventEmitter();

  taskForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    dueDate: new FormControl(''),
    time: new FormControl('')
  });

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  onSubmit(): void {
    if (this.taskForm.value.dueDate && this.taskForm.value.time) {
      const hour = this.taskForm.value.time.split(':')[0];
      const minute = this.taskForm.value.time.split(':')[1];
      this.taskForm.value.dueDate.setHours(hour, minute);
    }
    this.taskService.create(this.taskForm.value.name, this.taskForm.value.dueDate).subscribe(task => {
      this.created.emit(task);
      this.taskForm.reset();
    });
  }
}
