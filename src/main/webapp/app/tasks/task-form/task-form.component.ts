import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Output, Input } from '@angular/core';
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
  @Output() deletedDone: EventEmitter<Task> = new EventEmitter();
  @Input()doneCount:number;

  taskForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  onSubmit(): void {

    if (this.taskForm.invalid) {
      return;
  }

    this.taskService.create(this.taskForm.value.name).subscribe(task => {
      this.created.emit(task);
      this.taskForm.reset();
    });
  }

  deleteDone():void{
    this.taskService.deleteDone().subscribe(() => {
      this.deletedDone.emit(null);
    });
  }
}
