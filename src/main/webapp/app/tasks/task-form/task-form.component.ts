import {ChangeDetectionStrategy, Component, EventEmitter, Inject, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {Task} from '../task';
import {TaskService} from '../task.service';
import {AppGlobalValuesService} from "app/service/app-global-values.service";

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
              private appGlobalValuesService: AppGlobalValuesService) {
  }

  onSubmit(): void {
    this.taskService.create(this.taskForm.value.name, this.appGlobalValuesService.getUserProfileObject().id).subscribe(task => {
      this.created.emit(task);
      this.taskForm.reset();
    });
  }
}
