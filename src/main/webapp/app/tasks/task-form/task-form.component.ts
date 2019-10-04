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

  imageFile: File;
  fileName: String = 'Select a image to upload..';

  taskForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(@Inject('TaskService') private taskService: TaskService) {}

  onSubmit(): void {
    this.taskService.create(this.taskForm.value.name, this.imageFile).subscribe(task => {
      this.created.emit(task);
      this.taskForm.reset();
      this.imageFile = undefined;
      this.fileName = 'Select a image to upload..';
    });
  }

  onFileChange(event, imageFileInput) {
    if (event.target.files && event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
      this.fileName = this.imageFile.name;
    }
  }
}
