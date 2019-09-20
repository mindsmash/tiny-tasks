import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Task } from '../task';
import { TaskService } from '../task.service';
import {AuthService} from "app/login/auth/auth.service";

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
    name: new FormControl('', Validators.required)
  });

  constructor(@Inject('TaskService') private taskService: TaskService,
              @Inject('AuthService') private authService: AuthService) { }

  onSubmit(): void {
    this.taskService.create(this.taskForm.value.name, this.authService.user.username).subscribe(task => {
      this.created.emit(task);
      this.taskForm.reset();
    });
  }
}
