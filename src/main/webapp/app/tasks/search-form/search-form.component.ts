import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Task } from '../task';
import { TaskService } from '../task.service';

/**
 * A form to create tiny tasks.
 */
@Component({
  selector: 'search-task-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFormComponent {

  @Output() found: EventEmitter<string> = new EventEmitter();

  taskForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  onSubmit(): void {
      this.found.emit(this.taskForm.value.name);
      this.taskForm.reset();
  }
}
