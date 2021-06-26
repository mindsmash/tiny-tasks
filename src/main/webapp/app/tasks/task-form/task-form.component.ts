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
  @Output() updated: EventEmitter<Task> = new EventEmitter();
  @Output() donesky: EventEmitter<Task> = new EventEmitter();

  taskForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  //? here needs to be the dueDate added preferably by a nice component data Picker of some sort
  onSubmit(): void {
    this.taskService.create(
      this.taskForm.value.name,
      this.taskForm.value.done,
      this.taskForm.value.dueDate,
      this.taskForm.value.created,
      this.taskForm.value.modified).subscribe(task => {
      this.created.emit(task);
      this.taskForm.reset();
    });
  }


}
