import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/services';
import { TaskService } from '../../../services/task/task.service';

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
  public taskForm: FormGroup;

  constructor(
    @Inject('TaskService') private taskService: TaskService,
    private authService: AuthService,
  ) {
    this.taskForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(128)]),
    });
  }

  onSubmit(): void {
    if (!this.taskForm.valid) {
      console.warn('Please check the name!');
      return;
    }

    if (!this.authService.hasValidToken()) {
      console.warn('Your token is invalid!');
      this.authService.onUserLogout.next();
      return;
    }

    this.taskService.create(this.taskForm.value.name, this.authService.getTokenValue('uuid')).subscribe(task => {
      this.taskForm.reset();
      this.taskService.reloadTasks$.next();
    });
  }
}
