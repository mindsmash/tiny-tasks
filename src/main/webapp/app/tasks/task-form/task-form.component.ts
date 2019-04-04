import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Task } from '../task';

@Component({
  selector: 'tiny-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {

  @Output() created: EventEmitter<Task> = new EventEmitter();

  taskForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required)
  });

  onSubmit(): void {
    this.created.emit(this.taskForm.value);
  }
}
